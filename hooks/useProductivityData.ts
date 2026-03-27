import { db } from '@/constants/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface Topic {
  title: string;
  overview: string;
  benefits: string[];
  expertTip: string;
}

export interface CategoryData {
  category: string;
  topics: Topic[];
}

export function useProductivityData() {
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, 'productivity'));
        const categories: CategoryData[] = [];

        querySnapshot.forEach((doc) => {
          const docData = doc.data();

          Object.keys(docData).forEach(key => {
            if (Array.isArray(docData[key])) {
              const rawTopics = docData[key];
              const mappedTopics: Topic[] = rawTopics.map((t: any) => ({
                title: t.title || '',
                overview: t.overview || '',
                expertTip: t.expertTip || '',
                benefits: Array.isArray(t.benefits)
                  ? t.benefits
                  : (t.benefits ? Object.values(t.benefits) : []),
              }));

              categories.push({
                category: key,
                topics: mappedTopics,
              });
            }
          });
        });

        const filteredCategories = categories.filter(c => c.topics.length > 0);

        setData(filteredCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching productivity data:", err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

