import React, { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ToolFilled, ShopFilled, FormatPainterFilled } from '@ant-design/icons';
import { fetchDashboard } from '@/services/dashboard';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 8 + 1000 * 30; // Moment is also OK

const Dashboard = () => {
  // 定义组件状态
  let [data, setData] = useState({});
  const [responsive, setResponsive] = useState(false);

  useEffect(async () => {
    // 发送请求，获取统计数据
    const counts = await fetchDashboard();
    setData(counts);
  }, []);
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="未处理报修申请数量"
              value={data.repair_apply_count}
              valueStyle={{ color: '#546de5' }}
              prefix={<ToolFilled />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="未处理软件安装申请数量"
              value={data.software_apply_count}
              valueStyle={{ color: '#e66767' }}
              prefix={<ShopFilled />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="未处理教室借用申请数量"
              value={data.classroom_apply_count}
              valueStyle={{ color: '#079992' }}
              prefix={<FormatPainterFilled />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row gutter={16}>
              <Col span={24} style={{ marginTop: 32 }}>
                <Countdown
                  style={{ color: 'red', fontWeight: '500' }}
                  title="放假倒计时"
                  value={deadline}
                  format="D 天 H 时 m 分 s 秒"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
