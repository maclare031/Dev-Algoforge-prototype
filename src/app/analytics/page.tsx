// app/analytics/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  MousePointerClick,
  Clock,
  BarChart,
  LineChart,
  Globe,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { ResponsiveContainer, LineChart as RechartsLineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid } from 'recharts';

// Define the structure of our fetched analytics data
interface AnalyticsData {
    stats: {
        totalUsers: string;
        sessions: string;
        bounceRate: string;
        avgSessionDuration: string;
    };
    trafficData: { date: string; users: number }[];
    topReferrers: { source: string; visitors: string }[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics');
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message || 'An unknown error occurred.');
        }
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Could not load analytics data. Please ensure your API keys are correct.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                <p className="text-slate-400 font-medium">Fetching live analytics data...</p>
                <p className="text-slate-500 text-sm">This may take a moment.</p>
            </div>
        </div>
    );
  }

  if (error) {
     return (
        <div className="min-h-screen bg-black flex items-center justify-center text-center p-4">
            <div className="bg-slate-900/50 border border-red-500/30 rounded-2xl p-8 max-w-lg">
                <h2 className="text-2xl font-bold text-red-400">An Error Occurred</h2>
                <p className="mt-2 text-slate-400">{error}</p>
                 <Link href="/">
                    <Button variant="outline" className="mt-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Admin Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
            <motion.div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" animate={{ x: [-50, 50, -50], y: [-50, 50, -50] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} style={{ left: "10%", top: "20%" }}/>
            <motion.div className="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl" animate={{ x: [50, -50, 50], y: [50, -50, 50] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} style={{ right: "10%", bottom: "20%" }}/>
        </div>

        <div className="relative z-10">
            {/* Header */}
            <header className="sticky top-0 bg-black/50 backdrop-blur-lg border-b border-gray-700/50">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                <BarChart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
                                <p className="text-xs text-gray-400">Live Data from Google Analytics</p>
                            </div>
                        </div>
                        <Link href="/super-admin" className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Admin
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-black/50 border-blue-500/30 hover:border-blue-500/60 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Visitors</CardTitle>
                            <Users className="h-4 w-4 text-blue-400" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold text-white">{data?.stats.totalUsers}</div></CardContent>
                    </Card>
                    <Card className="bg-black/50 border-green-500/30 hover:border-green-500/60 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Bounce Rate</CardTitle>
                            <MousePointerClick className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold text-white">{data?.stats.bounceRate}%</div></CardContent>
                    </Card>
                    <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Avg. Session</CardTitle>
                            <Clock className="h-4 w-4 text-purple-400" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold text-white">{Number(data?.stats.avgSessionDuration || 0).toFixed(0)}s</div></CardContent>
                    </Card>
                    <Card className="bg-black/50 border-orange-500/30 hover:border-orange-500/60 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Sessions</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-400" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold text-white">{data?.stats.sessions}</div></CardContent>
                    </Card>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-black/50 backdrop-blur-lg border border-gray-700/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2"><LineChart className="text-cyan-400"/> User Traffic (Last 28 Days)</CardTitle>
                            <CardDescription className="text-slate-400 pt-1">Shows daily active users visiting your site.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <RechartsLineChart data={data?.trafficData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 200, 200, 0.1)" />
                                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: 'black', border: '1px solid #334155' }} />
                                    <Legend wrapperStyle={{fontSize: "14px"}}/>
                                    <Line type="monotone" dataKey="users" stroke="#22d3ee" strokeWidth={2} activeDot={{ r: 8 }} dot={{ r: 2 }}/>
                                </RechartsLineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-black/50 backdrop-blur-lg border border-gray-700/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2"><Globe className="text-purple-400"/> Top Referrers</CardTitle>
                            <CardDescription className="text-slate-400 pt-1">Where your traffic is coming from.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {data?.topReferrers.map(r => (
                                    <li key={r.source} className="flex items-center justify-between bg-slate-800/20 p-3 rounded-lg">
                                        <span className="text-slate-300 font-medium capitalize">{r.source.replace('(direct)', 'Direct')}</span>
                                        <span className="font-bold text-white block bg-slate-700/50 px-2 py-1 rounded-md text-sm">{r.visitors}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    </div>
  );
}