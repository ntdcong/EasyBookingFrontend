import React, { useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.style.left = `${Math.random() * window.innerWidth}px`;
      snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
      snowflake.style.opacity = Math.random();
      document.querySelector('.snowfall').appendChild(snowflake);
      setTimeout(() => snowflake.remove(), 5000);
    };
    const snowInterval = setInterval(createSnowflake, 100);
    return () => clearInterval(snowInterval);
  }, []);

  const lineChartData = { labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'], datasets: [{ label: 'Doanh thu 2024', data: [65, 59, 80, 81, 56, 55, 40, 88, 96, 67, 89, 95], borderColor: 'rgb(75, 192, 192)', tension: 0.1 }] };
  const barChartData = { labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'], datasets: [{ label: 'Đơn hàng trong tuần', data: [12, 19, 3, 5, 2, 3, 9], backgroundColor: 'rgba(255, 99, 132, 0.5)' }] };
  const pieChartData = { labels: ['Điện thoại', 'Laptop', 'Tablet', 'Phụ kiện'], datasets: [{ data: [30, 25, 20, 25], backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'] }] };
  const doughnutChartData = { labels: ['Hoàn thành', 'Đang xử lý', 'Hủy'], datasets: [{ data: [70, 20, 10], backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(255, 99, 132, 0.5)'] }] };

  return (
    <div className="dashboard">
      <div className="snowfall"></div>
      <div className="container-fluid p-4">
        <h1 className="text-center text-danger mb-4"><i className="fas fa-Christmas-tree me-2"></i>Dashboard Quản Trị</h1>
        <div className="row mb-4">
          {['Tổng doanh thu', 'Đơn hàng mới', 'Khách hàng mới', 'Sản phẩm'].map((title, index) => (
            <div className="col-md-3" key={index}>
              <div className={`card bg-${['primary', 'success', 'warning', 'info'][index]} text-white`}>
                <div className="card-body">
                  <h5>{title}</h5>
                  <h3>{[2.5, 150, 85, 1250][index]}</h3>
                  <i className={`fas ${['fa-chart-line', 'fa-shopping-cart', 'fa-users', 'fa-box'][index]} float-end`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card"><div className="card-body"><h5 className="card-title">Biểu đồ doanh thu</h5><Line data={lineChartData} /></div></div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card"><div className="card-body"><h5 className="card-title">Trạng thái đơn hàng</h5><Doughnut data={doughnutChartData} /></div></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card"><div className="card-body"><h5 className="card-title">Đơn hàng trong tuần</h5><Bar data={barChartData} /></div></div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card"><div className="card-body"><h5 className="card-title">Phân bổ sản phẩm</h5><Pie data={pieChartData} /></div></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard { position: relative; min-height: 100vh; background: linear-gradient(to bottom, #f8f9fa, #e9ecef); }
        .snowfall { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1000; }
        .snowflake { position: fixed; top: -10px; color: #fff; font-size: 1em; text-shadow: 0 0 5px #000; animation: fall linear forwards; }
        .snowflake::after { content: "❅"; }
        @keyframes fall { to { transform: translateY(100vh); } }
        .card { border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease; }
        .card:hover { transform: translateY(-5px); }
        .card-body { padding: 1.5rem; }
        .fas { font-size: 2rem; opacity: 0.8; }
        h1 { font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); }
        @media (max-width: 768px) { .container-fluid { padding: 1rem; } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
