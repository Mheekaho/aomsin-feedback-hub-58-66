import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type GSBData = Tables<'GSB_DATA'>;

export interface DashboardStats {
  totalForms: number;
  contactProvided: number;
  hasSuggestions: number;
  severeComplaints: number;
  prevTotalForms: number;
  prevContactProvided: number;
  prevHasSuggestions: number;
  prevSevereComplaints: number;
}

export interface SentimentData {
  positive: number;
  negative: number;
  positiveCount: number;
  negativeCount: number;
}

export interface ServiceTypeData {
  service: string;
  current: number;
  previous: number;
}

export interface BranchTypeData {
  name: string;
  value: number;
  color: string;
}

export interface TopicData {
  main: string;
  sub: string;
  negative_count: number;
  positive_count: number;
}

export interface SatisfactionByRegion {
  region: string;
  criteria: string;
  score: number;
}

export const useSupabaseData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null);
  const [serviceTypeData, setServiceTypeData] = useState<ServiceTypeData[]>([]);
  const [branchTypeData, setBranchTypeData] = useState<BranchTypeData[]>([]);
  const [topicData, setTopicData] = useState<TopicData[]>([]);
  const [satisfactionData, setSatisfactionData] = useState<SatisfactionByRegion[]>([]);

  const fetchDashboardStats = async () => {
    try {
      // Get current month stats
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

      // Current month data
      const { data: currentData, error: currentError } = await supabase
        .from('GSB_DATA')
        .select('*')
        .eq('month', currentMonth)
        .eq('year', currentYear);

      if (currentError) throw currentError;

      // Previous month data
      const { data: prevData, error: prevError } = await supabase
        .from('GSB_DATA')
        .select('*')
        .eq('month', prevMonth)
        .eq('year', prevYear);

      if (prevError) throw prevError;

      const currentStats = {
        totalForms: currentData?.length || 0,
        contactProvided: currentData?.filter(d => d.is_contact === true).length || 0,
        hasSuggestions: currentData?.filter(d => d.has_suggestion === true).length || 0,
        severeComplaints: currentData?.filter(d => d.is_severe === true).length || 0,
      };

      const prevStats = {
        prevTotalForms: prevData?.length || 0,
        prevContactProvided: prevData?.filter(d => d.is_contact === true).length || 0,
        prevHasSuggestions: prevData?.filter(d => d.has_suggestion === true).length || 0,
        prevSevereComplaints: prevData?.filter(d => d.is_severe === true).length || 0,
      };

      setDashboardStats({ ...currentStats, ...prevStats });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to fetch dashboard statistics');
    }
  };

  const fetchSentimentData = async () => {
    try {
      const { data, error } = await supabase
        .from('GSB_DATA')
        .select('sentiment')
        .not('sentiment', 'is', null);

      if (error) throw error;

      const positive = data?.filter(d => d.sentiment === 'positive').length || 0;
      const negative = data?.filter(d => d.sentiment === 'negative').length || 0;
      const total = positive + negative;

      setSentimentData({
        positive: total > 0 ? Math.round((positive / total) * 100 * 10) / 10 : 0,
        negative: total > 0 ? Math.round((negative / total) * 100 * 10) / 10 : 0,
        positiveCount: positive,
        negativeCount: negative,
      });
    } catch (err) {
      console.error('Error fetching sentiment data:', err);
      setError('Failed to fetch sentiment data');
    }
  };

  const fetchServiceTypeData = async () => {
    try {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

      // Current month service types
      const { data: currentData, error: currentError } = await supabase
        .from('GSB_DATA')
        .select('service_type')
        .eq('month', currentMonth)
        .eq('year', currentYear)
        .not('service_type', 'is', null);

      if (currentError) throw currentError;

      // Previous month service types
      const { data: prevData, error: prevError } = await supabase
        .from('GSB_DATA')
        .select('service_type')
        .eq('month', prevMonth)
        .eq('year', prevYear)
        .not('service_type', 'is', null);

      if (prevError) throw prevError;

      // Count service types
      const serviceTypes = ['ฝาก/ถอน', 'ชำระเงิน', 'สมัครบริการ', 'สอบถาม', 'อื่นๆ'];
      const result = serviceTypes.map(service => {
        const currentCount = currentData?.filter(d => d.service_type?.includes(service)).length || 0;
        const prevCount = prevData?.filter(d => d.service_type?.includes(service)).length || 0;
        
        return {
          service,
          current: currentCount,
          previous: prevCount,
        };
      });

      setServiceTypeData(result);
    } catch (err) {
      console.error('Error fetching service type data:', err);
      setError('Failed to fetch service type data');
    }
  };

  const fetchBranchTypeData = async () => {
    try {
      const { data, error } = await supabase
        .from('filtered')
        .select('"วันให้บริการ"');

      if (error) throw error;

      const fiveDayBranches = data?.filter(d => d["วันให้บริการ"]?.includes('5')).length || 0;
      const sevenDayBranches = data?.filter(d => d["วันให้บริการ"]?.includes('7')).length || 0;
      const total = fiveDayBranches + sevenDayBranches;

      if (total > 0) {
        setBranchTypeData([
          {
            name: "ให้บริการ 5 วัน",
            value: Math.round((fiveDayBranches / total) * 100),
            color: "hsl(var(--tertiary))"
          },
          {
            name: "ให้บริการ 7 วัน",
            value: Math.round((sevenDayBranches / total) * 100),
            color: "hsl(var(--dashboard-blue-bg))"
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching branch type data:', err);
      setError('Failed to fetch branch type data');
    }
  };

  const fetchTopicData = async () => {
    try {
      const { data, error } = await supabase
        .from('GSB_DATA')
        .select('main_category, sub_category, sentiment')
        .not('main_category', 'is', null)
        .not('sub_category', 'is', null)
        .not('sentiment', 'is', null);

      if (error) throw error;

      // Group by main and sub category
      const groupedData: Record<string, Record<string, { positive: number; negative: number }>> = {};
      
      data?.forEach(item => {
        if (!item.main_category || !item.sub_category || !item.sentiment) return;
        
        if (!groupedData[item.main_category]) {
          groupedData[item.main_category] = {};
        }
        
        if (!groupedData[item.main_category][item.sub_category]) {
          groupedData[item.main_category][item.sub_category] = { positive: 0, negative: 0 };
        }
        
        if (item.sentiment === 'positive') {
          groupedData[item.main_category][item.sub_category].positive++;
        } else if (item.sentiment === 'negative') {
          groupedData[item.main_category][item.sub_category].negative++;
        }
      });

      // Convert to array format
      const result: TopicData[] = [];
      Object.entries(groupedData).forEach(([main, subCategories]) => {
        Object.entries(subCategories).forEach(([sub, counts]) => {
          result.push({
            main,
            sub,
            positive_count: counts.positive,
            negative_count: counts.negative,
          });
        });
      });

      setTopicData(result);
    } catch (err) {
      console.error('Error fetching topic data:', err);
      setError('Failed to fetch topic data');
    }
  };

  const fetchSatisfactionData = async () => {
    try {
      const { data, error } = await supabase
        .from('GSB_DATA')
        .select('"ภาค", q1, q2, q3, q4, q5, q6, q7')
        .not('"ภาค"', 'is', null);

      if (error) throw error;

      // Calculate averages by region
      const regionData: Record<string, { scores: number[]; count: number }> = {};
      
      data?.forEach(item => {
        if (!item["ภาค"]) return;
        
        const scores = [item.q1, item.q2, item.q3, item.q4, item.q5, item.q6, item.q7]
          .filter(score => score !== null) as number[];
        
        if (scores.length === 0) return;
        
        if (!regionData[item["ภาค"]]) {
          regionData[item["ภาค"]] = { scores: new Array(7).fill(0), count: 0 };
        }
        
        scores.forEach((score, index) => {
          if (score !== null) {
            regionData[item["ภาค"]].scores[index] += score;
          }
        });
        regionData[item["ภาค"]].count++;
      });

      // Convert to satisfaction data format
      const criteriaLabels = [
        "การดูแล ความเอาใจใส่",
        "ความประทับใจฯ",
        "ความน่าเชื่อถือฯ",
        "ความรวดเร็วฯ",
        "ความถูกต้องฯ",
        "ความพร้อมฯ",
        "สภาพแวดล้อมฯ"
      ];

      const result: SatisfactionByRegion[] = [];
      Object.entries(regionData).forEach(([region, data]) => {
        if (data.count > 0) {
          criteriaLabels.forEach((criteria, index) => {
            result.push({
              region,
              criteria,
              score: Math.round((data.scores[index] / data.count) * 10) / 10,
            });
          });
        }
      });

      setSatisfactionData(result);
    } catch (err) {
      console.error('Error fetching satisfaction data:', err);
      setError('Failed to fetch satisfaction data');
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchDashboardStats(),
          fetchSentimentData(),
          fetchServiceTypeData(),
          fetchBranchTypeData(),
          fetchTopicData(),
          fetchSatisfactionData(),
        ]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return {
    loading,
    error,
    dashboardStats,
    sentimentData,
    serviceTypeData,
    branchTypeData,
    topicData,
    satisfactionData,
    refetch: () => {
      setLoading(true);
      setError(null);
      Promise.all([
        fetchDashboardStats(),
        fetchSentimentData(),
        fetchServiceTypeData(),
        fetchBranchTypeData(),
        fetchTopicData(),
        fetchSatisfactionData(),
      ]).finally(() => setLoading(false));
    }
  };
};