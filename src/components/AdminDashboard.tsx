import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function AdminDashboard() {
  const [payments, setPayments] = useState([]);
  const [userMetrics, setUserMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTokensUsed: 0,
  });

  useEffect(() => {
    fetchPayments();
    fetchUserMetrics();
  }, []);

  const fetchPayments = async () => {
    const { data } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });
    setPayments(data || []);
  };

  const fetchUserMetrics = async () => {
    // Fetch user analytics from Supabase
    const { data: users } = await supabase.from('users').select('*');
    setUserMetrics({
      totalUsers: users?.length || 0,
      activeUsers: users?.filter((u: any) => u.last_active > Date.now() - 86400000).length || 0,
      totalTokensUsed: users?.reduce((acc: number, user: any) => acc + user.tokens_used, 0) || 0,
    });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="metrics-container">
        <div className="metric-card">
          <h3>Total Users</h3>
          <p>{userMetrics.totalUsers}</p>
        </div>
        <div className="metric-card">
          <h3>Active Users (24h)</h3>
          <p>{userMetrics.activeUsers}</p>
        </div>
        <div className="metric-card">
          <h3>Total Tokens Used</h3>
          <p>{userMetrics.totalTokensUsed}</p>
        </div>
      </div>

      <div className="payments-list">
        <h3>Recent Payments</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment: any) => (
              <tr key={payment.id}>
                <td>{payment.user_id}</td>
                <td>{payment.amount}</td>
                <td>{payment.payment_method}</td>
                <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}