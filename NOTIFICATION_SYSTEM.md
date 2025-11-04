# Notification System Documentation

## Overview
The education platform now includes a comprehensive notification system that keeps students informed about their learning progress, achievements, quiz results, and study reminders.

## Features

### 1. Notification Types
- **Quiz Notifications**: Triggered when a student completes a quiz with their score
- **Achievement Notifications**: Triggered when a student unlocks an achievement
- **Video Completion Notifications**: Triggered when a student completes watching a video
- **Study Reminders**: Scheduled reminders for study sessions
- **Doubt Responses**: Notifications when someone responds to a doubt
- **Study Group Updates**: Notifications about study group activities

### 2. Notification Bell
Located in the dashboard header, the notification bell shows:
- Unread notification count (red badge)
- Dropdown with 5 most recent notifications
- Quick access to full notifications page
- Mark as read functionality

### 3. Notifications Page
**URL**: `/notifications`

Features:
- View all notifications with timestamps
- Filter by type (All, Unread, Quizzes, Achievements, Reminders, Doubts)
- Mark individual notifications as read
- Mark all notifications as read
- Delete notifications
- Click notifications to navigate to related content

### 4. Notification Triggers

#### Quiz Completion
When a student submits a quiz:
- Notification title: "Quiz Completed"
- Message includes score percentage
- Different message for passed (≥70%) vs failed quizzes
- Links to progress page

#### Achievement Unlock
When a student reaches a milestone:
- Notification title: "Achievement Unlocked!"
- Shows achievement name and criteria
- Links to achievements page
- Example: "Quiz Master - Achieved 90% average score!"

#### Video Completion
When a student watches 90% of a video:
- Notification title: "Video Completed"
- Encourages taking the quiz
- Links back to video page

### 5. API Endpoints

#### Get Notifications
\`\`\`
GET /api/notifications
Response: {
  notifications: Notification[],
  unreadCount: number,
  total: number
}
\`\`\`

#### Create Notification
\`\`\`
POST /api/notifications
Body: {
  type: string,
  title: string,
  message: string,
  icon: string,
  actionUrl?: string
}
\`\`\`

#### Mark as Read
\`\`\`
PUT /api/notifications
Body: {
  notificationId?: string,
  markAllAsRead?: boolean
}
\`\`\`

#### Delete Notification
\`\`\`
DELETE /api/notifications/[id]
\`\`\`

### 6. Notification Preferences
Users can control notifications in Settings:
- **Push Notifications**: Enable/disable in-app notifications
- **Email Notifications**: Enable/disable email alerts

Location: `/settings` → Notifications tab

### 7. Data Storage
All notifications are stored in localStorage with the key format:
\`\`\`
notifications-{userId}
\`\`\`

Each notification object contains:
\`\`\`typescript
{
  id: string,
  userId: string,
  type: string,
  title: string,
  message: string,
  icon: string,
  actionUrl?: string,
  read: boolean,
  createdAt: string (ISO format)
}
\`\`\`

### 8. Real-time Updates
- Notification bell updates every 10 seconds
- Notifications page auto-refreshes every 10 seconds
- New notifications appear immediately when triggered

### 9. Integration Points

#### Dashboard
- Notification bell in header with unread count
- Dropdown preview of recent notifications
- Quick navigation to full notifications page

#### Quiz System
- Automatic notification on quiz submission
- Score and pass/fail status included
- Achievement unlock notifications for high scores

#### Video System
- Notification when video is 90% watched
- Encourages quiz participation

#### Settings
- Notification preferences management
- Enable/disable push and email notifications

### 10. Usage Examples

#### Accessing Notifications
1. Click the bell icon in the dashboard header
2. View recent notifications in dropdown
3. Click "View all notifications" to see full list
4. Or navigate directly to `/notifications`

#### Managing Notifications
- Click a notification to mark as read
- Click "Mark all as read" to clear unread badge
- Delete individual notifications with trash icon
- Filter by type using tabs

#### Notification Preferences
1. Go to Settings (`/settings`)
2. Click "Notifications" tab
3. Toggle "Push Notifications" and "Email Notifications"
4. Click "Save Settings"

## Future Enhancements
- Email notification delivery
- Push notifications to mobile devices
- Notification scheduling
- Custom notification preferences per type
- Notification history and analytics
- Sound alerts for important notifications
