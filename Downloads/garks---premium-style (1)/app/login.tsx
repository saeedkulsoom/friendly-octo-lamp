import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../src/store/useStore';
import { Smartphone, Mail, Globe, User, Lock, ArrowRight, ChevronLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react-native';
import { COLORS, FONTS, globalStyles } from '../src/theme';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [phoneStep, setPhoneStep] = useState<'input' | 'otp'>('input');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    securityCode: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser, setMode, addNotification, adminPassword, adminSecurityCode } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const isAdminCredentialMatch =
    formData.email.toLowerCase().trim() === 'thegarmentks@gmail.com' &&
    formData.phone === '03333333333' &&
    formData.password === adminPassword;

  const validate = () => {
    if (loginMethod === 'email') {
      if (!formData.email.endsWith('@gmail.com')) {
        setError('Only valid Gmail addresses are accepted.');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters.');
        return false;
      }
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      setError('Phone number must be exactly 11 digits.');
      return false;
    }
    return true;
  };

  const handlePhoneSubmit = () => {
    setError('');
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      setError('Enter a valid 11-digit phone number.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setPhoneStep('otp');
      setIsLoading(false);
      addNotification({
        title: "OTP Sent",
        message: "A verification code has been sent to your device.",
        type: 'info'
      });
    }, 1500);
  };

  const handleOtpVerify = () => {
    if (otp.length !== 6) {
      setError('Enter the 6-digit verification code.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      finalizeAuth('customer', 'Phone User');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      finalizeAuth('customer', 'Google User');
    }, 2000);
  };

  const finalizeAuth = (mode: 'admin' | 'customer', username: string) => {
    const isAdmin = mode === 'admin';
    setMode(mode);
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username || username,
      name: isAdmin ? 'Master Admin' : (formData.username || username),
      email: formData.email || (isAdmin ? 'thegarmentks@gmail.com' : 'user@gmail.com'),
      phone: formData.phone,
      isAdmin: isAdmin,
      points: 1200,
      tier: 'Silver'
    });

    addNotification({
      title: isAdmin ? "Admin Access Granted" : "Session Resumed",
      message: isAdmin ? "Gargi AI is initializing your dashboard." : "Your exclusive shopping session has started.",
      type: 'info'
    });

    router.replace(isAdmin ? '/(admin)' : '/(customer)');
    setIsLoading(false);
  };

  const handleAuth = () => {
    setError('');
    if (!validate()) return;
    setIsLoading(true);

    setTimeout(() => {
      const isAdminLogin = isAdminCredentialMatch && formData.securityCode === adminSecurityCode;
      const isIncorrectAdmin = formData.email === 'thegarmentks@gmail.com' && (!isAdminCredentialMatch || formData.securityCode !== adminSecurityCode);

      if (isIncorrectAdmin) {
        setError('Unauthorized administrator access sequence. Please verify credentials.');
        setIsLoading(false);
        return;
      }

      const mode = isAdminLogin ? 'admin' : 'customer';
      setMode(mode);
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        username: formData.username || (isAdminLogin ? 'Admin' : 'Guest'),
        name: isAdminLogin ? 'Master Admin' : (formData.username || 'Valued Customer'),
        email: formData.email,
        phone: formData.phone,
        isAdmin: isAdminLogin,
        points: 1200,
        tier: 'Silver'
      });

      addNotification({
        title: isAdminLogin ? "Admin Access Granted" : (isSignup ? "Welcome to GarKS" : "Session Resumed"),
        message: isAdminLogin ? "Gargi AI is initializing your dashboard." : "Your exclusive shopping session has started.",
        type: 'info'
      });

      router.replace(isAdminLogin ? '/(admin)' : '/(customer)');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {loginMethod === 'phone' && phoneStep === 'otp' ? (
            <TouchableOpacity style={styles.backButton} onPress={() => setPhoneStep('input')}>
              <ChevronLeft size={24} color={COLORS.brandMuted} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.backButton} onPress={() => loginMethod === 'phone' ? setLoginMethod('email') : router.replace('/')}>
              <ChevronLeft size={24} color={COLORS.brandMuted} />
            </TouchableOpacity>
          )}

          <Text style={styles.title}>
            {loginMethod === 'phone'
              ? (phoneStep === 'otp' ? 'Verify Code' : 'Phone Sign In')
              : (isSignup ? 'Create account' : 'Exclusive Access')}
          </Text>
          <Text style={styles.subtitle}>
            {loginMethod === 'phone'
              ? (phoneStep === 'otp' ? 'Enter the security code sent' : 'Enter your mobile identity')
              : 'Identify yourself to proceed'}
          </Text>
        </View>

        {loginMethod === 'email' ? (
          <View style={styles.formContainer}>
            {isSignup && (
              <View style={styles.inputWrapper}>
                <User size={18} color={COLORS.brandMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={COLORS.brandMuted}
                  value={formData.username}
                  onChangeText={(text) => setFormData({ ...formData, username: text })}
                />
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Mail size={18} color={COLORS.brandMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Gmail Address"
                placeholderTextColor={COLORS.brandMuted}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Smartphone size={18} color={COLORS.brandMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor={COLORS.brandMuted}
                value={formData.phone}
                onChangeText={(text) => {
                  const val = text.replace(/\D/g, '').slice(0, 11);
                  setFormData({ ...formData, phone: val });
                }}
                keyboardType="phone-pad"
              />
              <Text style={[styles.phoneLength, { color: formData.phone.length === 11 ? COLORS.brandPrimary : COLORS.brandMuted }]}>
                {formData.phone.length}/11
              </Text>
            </View>

            <View style={styles.inputWrapper}>
              <Lock size={18} color={COLORS.brandMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Secure Password"
                placeholderTextColor={COLORS.brandMuted}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                {showPassword ? <EyeOff size={18} color={COLORS.brandMuted} /> : <Eye size={18} color={COLORS.brandMuted} />}
              </TouchableOpacity>
            </View>

            {isAdminCredentialMatch && (
              <View style={[styles.inputWrapper, { borderColor: COLORS.brandPrimary, borderWidth: 1 }]}>
                <Globe size={18} color={COLORS.brandPrimary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: COLORS.brandPrimary }]}
                  placeholder="Admin Security Code"
                  placeholderTextColor="rgba(224, 201, 168, 0.4)"
                  value={formData.securityCode}
                  onChangeText={(text) => setFormData({ ...formData, securityCode: text })}
                  secureTextEntry={!showPassword}
                />
              </View>
            )}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAuth}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <>
                  <Text style={styles.submitButtonText}>{isSignup ? 'Create Account' : 'Authorize Session'}</Text>
                  <ArrowRight size={20} color="#000" />
                </>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            {phoneStep === 'input' ? (
              <>
                <View style={styles.inputWrapper}>
                  <Smartphone size={18} color={COLORS.brandMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone (11 Digits)"
                    placeholderTextColor={COLORS.brandMuted}
                    value={formData.phone}
                    onChangeText={(text) => {
                      const val = text.replace(/\D/g, '').slice(0, 11);
                      setFormData({ ...formData, phone: val });
                    }}
                    keyboardType="phone-pad"
                  />
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity
                  style={[styles.submitButton, formData.phone.length !== 11 && styles.disabledButton]}
                  onPress={handlePhoneSubmit}
                  disabled={isLoading || formData.phone.length !== 11}
                >
                  {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.submitButtonText}>Send Verification Code</Text>}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.inputWrapper}>
                  <ShieldCheck size={18} color={COLORS.brandPrimary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: COLORS.brandPrimary, textAlign: 'center', letterSpacing: 8 }]}
                    placeholder="6-Digit OTP"
                    placeholderTextColor="rgba(224, 201, 168, 0.4)"
                    value={otp}
                    onChangeText={(text) => setOtp(text.replace(/\D/g, '').slice(0, 6))}
                    keyboardType="number-pad"
                  />
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity
                  style={[styles.submitButton, otp.length !== 6 && styles.disabledButton]}
                  onPress={handleOtpVerify}
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.submitButtonText}>Verify & Enter</Text>}
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        <View style={styles.toggleContainer}>
          <TouchableOpacity onPress={() => { setIsSignup(!isSignup); setLoginMethod('email'); }}>
            <Text style={styles.toggleText}>
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gatewaysContainer}>
          <Text style={styles.gatewaysTitle}>Alternative Gateways</Text>
          <View style={styles.gatewaysGrid}>
            <TouchableOpacity style={styles.gatewayCard} onPress={handleGoogleLogin} disabled={isLoading}>
              <Globe size={24} color={COLORS.brandMuted} />
              <Text style={styles.gatewayText}>Google Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.gatewayCard, loginMethod === 'phone' && styles.gatewayCardActive]}
              onPress={() => { setLoginMethod('phone'); setPhoneStep('input'); }}
              disabled={isLoading}
            >
              <Smartphone size={24} color={loginMethod === 'phone' ? COLORS.brandPrimary : COLORS.brandMuted} />
              <Text style={[styles.gatewayText, loginMethod === 'phone' && { color: COLORS.brandPrimary }]}>Phone SMS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.brandBg },
  scrollContent: { padding: 32, flexGrow: 1, paddingTop: 64 },
  header: { marginBottom: 40 },
  backButton: { width: 48, height: 48, backgroundColor: COLORS.brandCard, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { fontSize: 36, fontFamily: FONTS.serif, color: COLORS.brandText, marginBottom: 8, fontStyle: 'italic' },
  subtitle: { fontSize: 10, fontFamily: FONTS.mono, color: COLORS.brandMuted, textTransform: 'uppercase', letterSpacing: 2 },
  formContainer: { gap: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(19, 42, 74, 0.5)', borderRadius: 24, paddingHorizontal: 16, height: 64, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  inputIcon: { marginRight: 16 },
  input: { flex: 1, color: COLORS.brandText, fontFamily: FONTS.mono, fontSize: 12 },
  phoneLength: { fontFamily: FONTS.mono, fontSize: 10, marginLeft: 8 },
  eyeIcon: { padding: 8 },
  errorText: { color: COLORS.danger, fontSize: 10, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' },
  submitButton: { flexDirection: 'row', backgroundColor: COLORS.brandPrimary, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 16 },
  disabledButton: { opacity: 0.5 },
  submitButtonText: { color: '#000', fontFamily: FONTS.mono, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
  toggleContainer: { marginTop: 32, alignItems: 'center' },
  toggleText: { color: COLORS.brandMuted, fontSize: 10, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 1 },
  gatewaysContainer: { marginTop: 48 },
  gatewaysTitle: { color: COLORS.brandMuted, fontSize: 10, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center', marginBottom: 24 },
  gatewaysGrid: { flexDirection: 'row', gap: 16 },
  gatewayCard: { flex: 1, backgroundColor: 'rgba(19, 42, 74, 0.3)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 24, padding: 24, alignItems: 'center', gap: 12 },
  gatewayCardActive: { borderColor: 'rgba(224, 201, 168, 0.3)', backgroundColor: 'rgba(224, 201, 168, 0.05)' },
  gatewayText: { color: COLORS.brandMuted, fontSize: 10, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' },
});
