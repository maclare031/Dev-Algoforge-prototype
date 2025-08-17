// app/api/analytics/route.ts

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

// FIX: Manually format the private key to handle newlines correctly.
const formattedPrivateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Initialize the Google Analytics Data API client
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: formattedPrivateKey, // Use the formatted key here
  },
});

const propertyId = process.env.GA_PROPERTY_ID;

export async function GET() {
  try {
    // --- 1. Fetch main stats (Users, Sessions, Bounce Rate) ---
    const [statsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      metrics: [
        { name: "totalUsers" },
        { name: "sessions" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
    });

    const stats = {
      totalUsers: statsResponse.rows?.[0]?.metricValues?.[0]?.value || '0',
      sessions: statsResponse.rows?.[0]?.metricValues?.[1]?.value || '0',
      bounceRate: parseFloat(statsResponse.rows?.[0]?.metricValues?.[2]?.value || '0').toFixed(2),
      avgSessionDuration: parseFloat(statsResponse.rows?.[0]?.metricValues?.[3]?.value || '0').toFixed(2),
    };

    // --- 2. Fetch traffic over time (for the line chart) ---
    const [trafficResponse] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "totalUsers" }],
    });

    const trafficData = trafficResponse.rows?.map(row => ({
        date: `${row.dimensionValues?.[0].value?.substring(4, 6)}/${row.dimensionValues?.[0].value?.substring(6, 8)}`, // Format date as MM/DD
        users: Number(row.metricValues?.[0].value || 0),
    })) || [];


    // --- 3. Fetch top referrers ---
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


    // Return all fetched data
    return NextResponse.json({
      success: true,
      stats,
      trafficData,
      topReferrers,
    });

  } catch (error) {
    console.error("Error fetching Google Analytics data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch analytics data." },
      { status: 500 }
    );
  }
}