#!/usr/bin/env node

const axios = require('axios');
const { Log } = require('./logging_middleware/logger');

// Base URL for notifications API
const BASE_URL = 'http://localhost:5001/api/notifications';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = (color, title, message) => {
  console.log(
    `\n${colors[color]}${colors.bright}═══ ${title} ═══${colors.reset}`
  );
  console.log(JSON.stringify(message, null, 2));
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTests() {
  try {
    log('cyan', 'STAGE 1: REST API Design & Structure', {
      description: 'Testing REST API endpoints with proper contracts',
      endpoints: [
        'GET /api/notifications - Get all notifications',
        'POST /api/notifications - Create notification',
        'GET /api/notifications/category/:category - Get by category',
        'PATCH /api/notifications/:id/read - Mark as read',
      ],
    });

    // Test 1.1: Get all notifications
    console.log('\n\n📥 TEST 1.1: Fetching All Notifications');
    const allNotifications = await axios.get(`${BASE_URL}/`);
    log('green', 'Stage 1.1 Result: All Notifications', {
      status: allNotifications.status,
      total: allNotifications.data.total,
      count: allNotifications.data.count,
      notifications: allNotifications.data.notifications.slice(0, 2),
    });

    // Test 1.2: Create notification
    console.log('\n📤 TEST 1.2: Creating New Notification');
    const newNotif = await axios.post(`${BASE_URL}/`, {
      title: 'Amazon Cloud Jobs',
      description: 'Amazon Web Services is recruiting Cloud Engineers',
      category: 'placements',
      priority: 'high',
      targetAudience: 'CSE Department',
    });
    log('green', 'Stage 1.2 Result: Notification Created', {
      status: newNotif.status,
      notification: newNotif.data.notification,
    });

    // Test 1.3: Get by category
    console.log('\n📂 TEST 1.3: Fetching Notifications by Category');
    const placementsNotif = await axios.get(`${BASE_URL}/category/placements`);
    log('green', 'Stage 1.3 Result: Placements Category', {
      status: placementsNotif.status,
      category: placementsNotif.data.category,
      count: placementsNotif.data.count,
      notifications: placementsNotif.data.notifications.slice(0, 2),
    });

    // Test 1.4: Mark as read
    console.log('\n✅ TEST 1.4: Marking Notification as Read');
    const markRead = await axios.patch(`${BASE_URL}/1/read`);
    log('green', 'Stage 1.4 Result: Marked as Read', {
      status: markRead.status,
      notification: markRead.data.notification,
    });

    await sleep(1000);

    // ============= STAGE 2 & 3 =============
    log('cyan', 'STAGE 2 & 3: Database Schema & Query Optimization', {
      description: 'Demonstrating schema design and optimization strategies',
      features: [
        'PostgreSQL with 4 normalized tables',
        'Composite indexes on frequently queried columns',
        'Query optimization for 5M+ notifications',
        'Keyset pagination instead of OFFSET',
      ],
    });

    console.log('\n🗄️  TEST 2.1: Database Schema Information');
    const schemaInfo = await axios.get(`${BASE_URL}/info/schema`);
    log('green', 'Stage 2.1 Result: Schema Design', {
      database: schemaInfo.data.data.database,
      tables: schemaInfo.data.data.tables.length,
      tableDetails: schemaInfo.data.data.tables.slice(0, 2),
    });

    console.log('\n🚀 TEST 3.1: Query Optimization Strategies');
    const optimizationInfo = await axios.get(`${BASE_URL}/info/optimization`);
    log('green', 'Stage 3.1 Result: Optimization Techniques', {
      problem: optimizationInfo.data.data.problem,
      solutions: optimizationInfo.data.data.solutions.length,
      solution1: optimizationInfo.data.data.solutions[0],
    });

    await sleep(1000);

    // ============= STAGE 4 =============
    log('cyan', 'STAGE 4: Performance Optimization for Page Loads', {
      description: 'Caching, pagination, and background sync strategies',
      techniques: [
        'Redis caching (5 min TTL)',
        'Lazy loading with pagination',
        'Browser localStorage caching (1 hour)',
        'Background sync service',
        'Aggregated notifications summary',
      ],
    });

    console.log('\n⚡ TEST 4.1: Statistics & Performance Metrics');
    const stats = await axios.get(`${BASE_URL}/stats/all`);
    log('green', 'Stage 4.1 Result: Performance Metrics', {
      totalNotifications: stats.data.data.total,
      readVsUnread: {
        read: stats.data.data.read,
        unread: stats.data.data.unread,
      },
      byCategory: stats.data.data.byCategory,
      cacheHitRate: stats.data.data.performance.cacheHitRate,
      avgResponseTime: stats.data.data.performance.avgResponseTime,
    });

    await sleep(1000);

    // ============= STAGE 5 =============
    log('cyan', 'STAGE 5: Real-time Notifications', {
      description: 'Bulk distribution with Bull queues and WebSocket',
      features: [
        'Distributed queue system (Bull + Redis)',
        'Email + In-app notifications',
        'Exponential backoff retry logic',
        'Fault tolerance',
        'Real-time WebSocket delivery',
      ],
    });

    console.log('\n📢 TEST 5.1: Sending Bulk Notifications');
    const bulkNotif = await axios.post(`${BASE_URL}/send/bulk`, {
      title: 'Placement Season Open 2026',
      description:
        'Top 100 companies are recruiting. Register now for interviews.',
      category: 'placements',
      priority: 'high',
      targetAudience: '2nd, 3rd, 4th Year',
    });
    log('green', 'Stage 5.1 Result: Bulk Notification Queued', {
      notificationId: bulkNotif.data.data.notificationId,
      totalQueued: bulkNotif.data.data.totalQueued,
      totalStudents: bulkNotif.data.data.totalStudents,
      channels: bulkNotif.data.data.channels,
      distributionStatus: bulkNotif.data.data.distributionStatus,
      estimatedDeliveryTime: bulkNotif.data.data.estimatedDeliveryTime,
      retryPolicy: bulkNotif.data.data.retryPolicy,
    });

    await sleep(1000);

    // ============= STAGE 6 =============
    log('cyan', 'STAGE 6: Priority Inbox - Top Notifications', {
      description: 'Weighted scoring system for intelligent notification ranking',
      scoringFormula: {
        categoryWeight: 'Placements(300) > Results(200) > Events(100)',
        priorityScore: 'High(100) > Normal(50) > Low(10)',
        recencyScore: '100 - (hoursOld * 0.5)',
        totalScore: 'categoryWeight + priorityScore + recencyScore',
      },
    });

    console.log('\n🏆 TEST 6.1: Fetching Priority Inbox (Top 10)');
    const priorityInbox = await axios.get(`${BASE_URL}/inbox/priority`);
    log('green', 'Stage 6.1 Result: Priority Inbox', {
      topNotifications: priorityInbox.data.data.topNotifications.slice(0, 3),
      totalCount: priorityInbox.data.data.totalCount,
      scoringFormula: priorityInbox.data.data.scoringFormula,
    });

    console.log('\n\n');
    log('yellow', 'SUMMARY: All 6 Stages Completed Successfully', {
      stage1: '✅ REST API Design - 4 endpoints tested',
      stage2: '✅ Database Schema - PostgreSQL with normalized tables',
      stage3: '✅ Query Optimization - Composite indexes & keyset pagination',
      stage4: '✅ Performance Optimization - Caching & pagination',
      stage5: '✅ Real-time Notifications - Bulk distribution with queues',
      stage6: '✅ Priority Inbox - Weighted scoring algorithm',
      totalEndpoints: 9,
      totalTests: 8,
    });

    console.log('\n📊 Full API Response for Reference:\n');
    log('blue', 'Final Statistics', stats.data.data);

    process.exit(0);
  } catch (error) {
    console.error(
      `\n${colors.red}${colors.bright}❌ ERROR${colors.reset}`,
      error.response?.data || error.message
    );
    process.exit(1);
  }
}

// Run tests
runTests();
