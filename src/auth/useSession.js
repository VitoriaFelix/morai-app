import { useEffect, useState } from 'react';
import { api } from '../api';
export function useSession(){ const [me,setMe]=useState(null); const [loading,setLoading]=useState(true);
useEffect(()=>{ api.get('/me').then(r=>setMe(r.data)).catch(()=>{}).finally(()=>setLoading(false)); },[]);
const isSyndicOf=(condoId)=>me?.syndicOf?.includes(condoId); const isTitularOfUnit=(unitId)=>me?.memberships?.some(m=>m.unitId===unitId && m.type==='TITULAR');
return { me, loading, isSyndicOf, isTitularOfUnit }; }
