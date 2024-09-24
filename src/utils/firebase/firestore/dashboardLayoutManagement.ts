// utils/firebase/dashboardLayoutsManagement.ts

import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebaseConfig';
import { Layout } from 'react-grid-layout';

interface DashboardLayout {
  id: string;
  name: string;
  layouts: { lg: Layout[] };
  activeWidgets: string[];
}

export const saveDashboardLayout = async (userId: string, layout: DashboardLayout) => {
  try {
    if (layout.id && layout.name && layout.layouts && layout.activeWidgets) {
      const layoutRef = doc(db, 'users', userId, 'dashboardLayouts', layout.id);
      await setDoc(layoutRef, layout);
    } else {
      throw new Error('Invalid dashboard layout data');
    }
  } catch (error) {
    console.error('Error saving dashboard layout:', error);
    throw error;
  }
};

export const getDashboardLayouts = async (userId: string) => {
  try {
    const layoutsRef = collection(db, 'users', userId, 'dashboardLayouts');
    const layoutsSnapshot = await getDocs(layoutsRef);
    return layoutsSnapshot.docs.map(doc => doc.data() as DashboardLayout);
  } catch (error) {
    console.error('Error getting dashboard layouts:', error);
    throw error;
  }
};
