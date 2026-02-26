'use client';

import { useState } from 'react';
import {
  Clock,
  Target,
  PieChart,
  Star,
  TrendingDown,
  CheckCircle,
  Activity,
  MessageSquare,
} from 'lucide-react';
import { performanceMetrics } from '@/lib/mockData/analyticsData';

const metricCards = [
  {
    title: 'Processing Speed',
    value: performanceMetrics.processingSpeed.value,
    description: 'Average Invoice Processing Time',
    benchmark: performanceMetrics.processingSpeed.benchmark,
    badge: performanceMetrics.processingSpeed.status,
    trend: performanceMetrics.processingSpeed.trend,
    icon: Clock,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Accuracy',
    value: performanceMetrics.accuracy.value,
    description: 'Invoice Approval Accuracy',
    benchmark: performanceMetrics.accuracy.benchmark,
    badge: performanceMetrics.accuracy.status,
    trend: performanceMetrics.accuracy.details,
    icon: Target,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Budget Utilization',
    value: performanceMetrics.budgetUtilization.value,
    description: 'Average Caseload Budget Usage',
    benchmark: `Range: ${performanceMetrics.budgetUtilization.range}`,
    badge: performanceMetrics.budgetUtilization.status,
    trend: performanceMetrics.budgetUtilization.details,
    icon: PieChart,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    title: 'Participant Satisfaction',
    value: performanceMetrics.satisfaction.value,
    description: 'Avg Participant Feedback Score',
    benchmark: performanceMetrics.satisfaction.details,
    badge: performanceMetrics.satisfaction.status,
    trend: performanceMetrics.satisfaction.comments,
    icon: Star,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <Activity className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Your Performance &amp; Caseload Analytics
          </h2>
          <p className="text-sm text-gray-500">
            Real-time metrics for your caseload
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${metric.iconColor}`} />
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {metric.badge}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {metric.value}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {metric.title}
              </p>
              <p className="text-sm text-gray-500">{metric.description}</p>
              <div className="mt-3 border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500">
                  Benchmark: {metric.benchmark}
                </p>
                <p className="mt-1 text-xs text-emerald-600">{metric.trend}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
