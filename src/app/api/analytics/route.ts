// src/app/api/analytics/route.ts

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

export async function GET() {
  const gaPrivateKey = process.env.GA_PRIVATE_KEY;
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const propertyId = process.env.GA_PROPERTY_ID;

  if (!gaPrivateKey || !clientEmail || !propertyId) {
    console.error("CRITICAL: Missing Google Analytics environment variables.");
    return NextResponse.json(
      { success: false, message: "Server configuration error: Missing GA variables." },
      { status: 500 }
    );
  }

  let formattedPrivateKey;

  // --- THIS LOGIC HANDLES BOTH LOCAL & HOSTED ENVIRONMENTS ---
  // It checks if the key is the raw multi-line version or the Base64 version.
  if (gaPrivateKey.startsWith("-----BEGIN PRIVATE KEY-----")) {
    // If it's the raw key (for local development), use it directly.
    formattedPrivateKey = gaPrivateKey;
  } else {
    // Otherwise, assume it's Base64 encoded (for hosting) and decode it.
    try {
      formattedPrivateKey = Buffer.from(gaPrivateKey, 'base64').toString('utf8');
    } catch (error) {
      console.error("CRITICAL: Failed to decode Base64 private key. Check if the GA_PRIVATE_KEY variable on your hosting is a valid Base64 string.", error);
      return NextResponse.json(
        { success: false, message: "Server configuration error: Invalid private key format." },
        { status: 500 }
      );
    }
  }
  
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: formattedPrivateKey,
    },
  });

  try {
    const [statsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      metrics: [
        { name: "totalUsers" }, { name: "sessions" },
        { name: "bounceRate" }, { name: "averageSessionDuration" },
      ],
    });

    const stats = {
      totalUsers: statsResponse.rows?.[0]?.metricValues?.[0]?.value || '0',
      sessions: statsResponse.rows?.[0]?.metricValues?.[1]?.value || '0',
      bounceRate: parseFloat(statsResponse.rows?.[0]?.metricValues?.[2]?.value || '0').toFixed(2),
      avgSessionDuration: parseFloat(statsResponse.rows?.[0]?.metricValues?.[3]?.value || '0').toFixed(2),
    };

    const [trafficResponse] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "totalUsers" }],
    });

    const trafficData = trafficResponse.rows?.map(row => ({
        date: `${row.dimensionValues?.[0].value?.substring(4, 6)}/${row.dimensionValues?.[0].value?.substring(6, 8)}`,
        users: Number(row.metricValues?.[0].value || 0),
    })) || [];

    const [referrerResponse] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "totalUsers" }],
        limit: 5
    });

    const topReferrers = referrerResponse.rows?.map(row => ({
        source: row.dimensionValues?.[0].value || 'Unknown',
        visitors: row.metricValues?.[0].value || '0',
    })) || [];

    return NextResponse.json({
      success: true,
      stats,
      trafficData,
      topReferrers,
    });

  } catch (error: any) {
    console.error("Error fetching Google Analytics data:", error.details || error.message);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch analytics data from Google.",
        errorDetails: error.details || error.message 
      },
      { status: 500 }
    );
  }
}