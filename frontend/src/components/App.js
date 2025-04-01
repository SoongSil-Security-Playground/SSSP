import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';

import PrivateRoute from '../routes/PrivateRoute';
import AdminRoute from '../routes/AdminRoute';

import NavigationBar from './NavigationBar';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UsersPage from '../pages/UsersPage';
import ScoreboardPage from '../pages/ScoreboardPage';
import NotificationsPage from '../pages/NotificationsPage';
import ChallengesPage from '../pages/ChallengesPage';
import MypagePage from '../pages/MypagePage';
import ChangePasswordPage from '../pages/ChangePasswordPage';

import ChallengesSettingPage from '../pages/ChallengesSettingPage';
import UsersSettingPage from '../pages/UsersSettingPage';
import NotificationsSettingPage from '../pages/NotificationsSettingPage';

import UserForm from './UserForm';
import ChallengeForm from './ChallengeForm';
import NotificationForm from './NotificationForm';

import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/toast.css'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Router>
          <NavigationBar />
          <ToastContainer
            position='bottom-right'
            style={{ margin: '0px 40px' }}
            hideProgressBar={true}
            closeOnClick
          />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/scoreboard"
              element={
                <PrivateRoute>
                  <ScoreboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <PrivateRoute>
                  <ChallengesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage"
              element={
                <PrivateRoute>
                  <MypagePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage/change-password"
              element={
                <PrivateRoute>
                  <ChangePasswordPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/challenges"
              element={
                <AdminRoute>
                  <ChallengesSettingPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UsersSettingPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <AdminRoute>
                  <NotificationsSettingPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/challenges/add"
              element={
                <AdminRoute>
                  <ChallengeForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/challenges/edit/:challengeId"
              element={
                <AdminRoute>
                  <ChallengeForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/notifications/add"
              element={
                <AdminRoute>
                  <NotificationForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/notifications/edit/:notificationId"
              element={
                <AdminRoute>
                  <NotificationForm />
                </AdminRoute>
              }
            />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
