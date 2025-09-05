import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/AppAuthContext";
import { User, Lock, Eye, EyeOff, Check, Shield } from "lucide-react";
const AomsinLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    signIn
  } = useAuth();
  const testAccounts = [{
    id: "hr",
    username: "hr_user",
    password: "password123",
    display: "HR User - สมศรี ใจดี",
    displayName: "สมศรี ใจดี",
    role: "hr" as const
  }, {
    id: "admin",
    username: "admin_boss",
    password: "password123",
    display: "Admin - สมชาย บริหาร",
    displayName: "สมชาย บริหาร",
    role: "admin" as const
  }];
  const validateForm = () => {
    const newErrors = {
      username: "",
      password: ""
    };
    if (!username.trim()) {
      newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    }
    if (!password.trim()) {
      newErrors.password = "กรุณากรอกรหัสผ่าน";
    }
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Find matching test account
    const testAccount = testAccounts.find(acc => acc.username === username && acc.password === password);
    if (testAccount) {
      signIn({
        username: testAccount.username,
        displayName: testAccount.displayName,
        role: testAccount.role,
        isAdmin: testAccount.role === "admin"
      });
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: `ยินดีต้อนรับ ${testAccount.displayName}`
      });
      navigate("/dashboard");
    } else if (username && password) {
      // Allow any custom login
      signIn({
        username,
        displayName: username,
        role: "hr",
        isAdmin: false
      });
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: `ยินดีต้อนรับ ${username}`
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: "กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน",
        variant: "destructive"
      });
    }
  };
  const handleTestAccountSelect = (account: typeof testAccounts[0]) => {
    setUsername(account.username);
    setPassword(account.password);
    setSelectedRole(account.id);
    setErrors({
      username: "",
      password: ""
    });
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin(e as any);
    }
  };
  const isFormValid = username.trim() && password.trim();
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tertiary/20 via-secondary/10 to-primary/20 p-4">
      <Card className="w-full max-w-md lg:max-w-2xl shadow-soft backdrop-blur-sm bg-white/95 border border-border/50 rounded-3xl">
        {/* Header Section */}
        <CardHeader className="text-center space-y-3 pb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            ระบบจัดการความคิดเห็นลูกค้า
          </h1>
          <p className="text-lg lg:text-xl font-medium text-brown">
            Customer Feedback Management System
          </p>
          <p className="text-sm text-brown">
            ธนาคารออมสิน - ฝ่ายนวัตกรรมสารสนเทศ
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Form Title */}
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold" style={{
            color: '#D8218C'
          }}>เข้าสู่ระบบ</h3>
            <p className="text-sm text-brown">
              กรุณาเข้าสู่ระบบเพื่อใช้งาน Dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-secondary">
                ชื่อผู้ใช้
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60" />
                <Input id="username" type="text" value={username} onChange={e => {
                setUsername(e.target.value);
                if (errors.username) setErrors(prev => ({
                  ...prev,
                  username: ""
                }));
              }} placeholder="กรอกชื่อผู้ใช้" className="pl-10 focus:ring-primary focus:border-primary rounded-lg placeholder:text-brown" aria-label="กรอกชื่อผู้ใช้" />
              </div>
              {errors.username && <p className="text-xs font-medium text-primary">{errors.username}</p>}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-secondary">
                รหัสผ่าน
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60" />
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({
                  ...prev,
                  password: ""
                }));
              }} onKeyPress={handleKeyPress} placeholder="กรอกรหัสผ่าน" className="pl-10 pr-10 focus:ring-primary focus:border-primary rounded-lg placeholder:text-brown" aria-label="กรอกรหัสผ่าน" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary" aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs font-medium text-primary">{errors.password}</p>}
            </div>
            
            {/* Login Button */}
            <Button type="submit" className="w-full font-medium py-3 rounded-lg text-white hover:opacity-90 transition-all" style={{
            backgroundColor: '#D8218C'
          }} disabled={!isFormValid}>
              เข้าสู่ระบบ
            </Button>
          </form>
          
          {/* Test Accounts Section */}
          <div className="space-y-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-border/30">
              <h4 className="text-sm font-medium text-center text-brown">
                บัญชีทดสอบ (รหัสผ่าน: password123)
              </h4>
              
              <div className="space-y-2">
                <button type="button" onClick={() => handleTestAccountSelect(testAccounts[0])} className={`w-full p-3 rounded-lg border text-left text-sm transition-all hover:bg-primary/5 hover:border-primary/30 ${selectedRole === "hr" ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/30' : 'bg-background/80 border-border'}`} aria-label="เลือกบัญชีทดสอบ HR User">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-secondary" />
                    <span className="text-black">HR User - สมศรี ใจดี</span>
                    {selectedRole === "hr" && <Check className="h-4 w-4 text-primary ml-auto" />}
                  </div>
                </button>
                
                <button type="button" onClick={() => handleTestAccountSelect(testAccounts[1])} className={`w-full p-3 rounded-lg border text-left text-sm transition-all hover:bg-primary/5 hover:border-primary/30 ${selectedRole === "admin" ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/30' : 'bg-background/80 border-border'}`} aria-label="เลือกบัญชีทดสอบ Admin">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4" style={{
                    color: '#CE5997'
                  }} />
                    <span className="text-brown">Admin - สมชาย บริหาร</span>
                    {selectedRole === "admin" && <Check className="h-4 w-4 text-primary ml-auto" />}
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-border/50 pt-4">
            <p className="text-xs text-center text-brown">
              ติดต่อสอบถาม: ฝ่ายนวัตกรรมสารสนเทศ · โทร 02-XXX-XXXX ต่อ XXXX
            </p>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default AomsinLogin;