import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Edit, Trash2, Lightbulb, X, Save, Users, UserCheck, UserCog } from "lucide-react";

type UserData = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: "hr" | "admin";
  department: string;
  lastLogin: string;
  status: boolean;
  isEditing?: boolean;
};

type UsageHistoryData = {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  success: boolean;
};

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "hr" | "admin">("all");
  const [activeTab, setActiveTab] = useState<"users" | "history">("users");
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Mock user data
  const [users, setUsers] = useState<UserData[]>([{
    id: "1",
    fullName: "สมศรี ใจดี",
    username: "hr_user",
    email: "somsri@company.com",
    role: "hr",
    department: "ฝ่ายทรัพยากรบุคคล",
    lastLogin: "2024-01-15 14:30",
    status: true
  }, {
    id: "2",
    fullName: "สมชาย บริหาร",
    username: "admin_boss",
    email: "somchai@company.com",
    role: "admin",
    department: "ฝ่ายบริหาร",
    lastLogin: "2024-01-15 09:15",
    status: true
  }, {
    id: "3",
    fullName: "สมหญิง ช่วยงาน",
    username: "hr_assistant",
    email: "somying@company.com",
    role: "hr",
    department: "ฝ่ายทรัพยากรบุคคล",
    lastLogin: "2024-01-14 16:45",
    status: false
  }]);

  // Mock usage history data
  const [usageHistory] = useState<UsageHistoryData[]>([{
    id: "1",
    user: "สมศรี ใจดี",
    action: "Login สำเร็จ",
    timestamp: "2024-01-15 14:30",
    ipAddress: "192.168.1.10",
    success: true
  }, {
    id: "2",
    user: "สมชาย บริหาร",
    action: "เปลี่ยนรหัสผ่าน",
    timestamp: "2024-01-15 16:40",
    ipAddress: "192.168.1.20",
    success: true
  }, {
    id: "3",
    user: "สมใส ช่วยงาน",
    action: "Login ล้มเหลว",
    timestamp: "2024-01-14 17:10",
    ipAddress: "192.168.1.30",
    success: false
  }]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateNew = () => {
    const newId = Date.now().toString();
    const newUserData: UserData = {
      id: newId,
      fullName: "",
      username: "",
      email: "",
      role: "hr",
      department: "",
      lastLogin: "-",
      status: true,
      isEditing: true
    };
    setUsers([newUserData, ...users]);
    setIsCreatingNew(true);
  };

  const handleSaveNew = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user || !user.fullName || !user.username || !user.email) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณากรอกข้อมูลให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }
    setUsers(users.map(u => u.id === userId ? { ...u, isEditing: false } : u));
    setIsCreatingNew(false);
    toast({
      title: "สำเร็จ",
      description: "เพิ่มผู้ใช้งานใหม่แล้ว"
    });
  };

  const handleCancelNew = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    setIsCreatingNew(false);
  };

  const handleEditUser = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isEditing: true } : u));
  };

  const handleSaveUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user || !user.fullName || !user.username || !user.email) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณากรอกข้อมูลให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }
    setUsers(users.map(u => u.id === userId ? { ...u, isEditing: false } : u));
    toast({
      title: "สำเร็จ",
      description: "อัปเดตข้อมูลผู้ใช้งานแล้ว"
    });
  };

  const handleCancelEdit = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isEditing: false } : u));
  };

  const handleDeleteUser = (userId: string) => {
    setDeleteUserId(userId);
  };

  const confirmDelete = () => {
    if (deleteUserId) {
      setUsers(users.filter(user => user.id !== deleteUserId));
      toast({
        title: "สำเร็จ",
        description: "ลบผู้ใช้งานแล้ว"
      });
      setDeleteUserId(null);
    }
  };

  const handleStatusToggle = (userId: string, newStatus: boolean) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
  };

  const handleFieldChange = (userId: string, field: keyof UserData, value: any) => {
    setUsers(users.map(u => u.id === userId ? { ...u, [field]: value } : u));
  };

  // Summary calculations
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status).length;
  const hrUsers = users.filter(u => u.role === "hr").length;

  return (
    <div className="container mx-auto px-6 lg:px-10 space-y-6 font-kanit">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 font-kanit">
            จัดการผู้ใช้งาน
          </h1>
          <p className="text-sm text-gray-500 font-kanit">
            จัดการข้อมูลผู้ใช้งานและสิทธิการเข้าถึงระบบ
          </p>
        </div>
        <Button 
          onClick={handleCreateNew} 
          disabled={isCreatingNew} 
          className="bg-gradient-to-r from-[#F2449E] to-[#FD84D6] hover:brightness-95 text-white rounded-full px-4 py-2 shadow-sm font-kanit"
        >
          <Plus className="h-4 w-4 mr-2" />
          สร้างผู้ใช้ใหม่
        </Button>
      </div>

      {/* Alert Card */}
      <div className="bg-[#FFF7DB] border border-[#FFE7A7] text-[#976F00] rounded-xl p-4 flex items-start gap-3">
        <Lightbulb className="h-5 w-5 text-[#976F00] mt-0.5 flex-shrink-0" />
        <p className="text-sm font-kanit">
          เชื่อมต่อ Supabase เพื่อใช้งานฟีเจอร์การจัดการผู้ใช้แบบเต็มรูปแบบ
        </p>
      </div>

      {/* Tab Selection */}
      <div className="bg-white shadow-sm rounded-xl px-2 py-2 inline-flex gap-2">
        <button 
          onClick={() => setActiveTab("users")} 
          className={`font-kanit rounded-full px-4 py-1.5 text-sm transition-all ${
            activeTab === "users" 
              ? "bg-[#F2449E]/90 text-white shadow-sm" 
              : "bg-gray-100 text-[#7A7A7A] hover:bg-gray-200"
          }`}
        >
          จัดการผู้ใช้งาน
        </button>
        <button 
          onClick={() => setActiveTab("history")} 
          className={`font-kanit rounded-full px-4 py-1.5 text-sm transition-all ${
            activeTab === "history" 
              ? "bg-[#F2449E]/90 text-white shadow-sm" 
              : "bg-gray-100 text-[#7A7A7A] hover:bg-gray-200"
          }`}
        >
          ประวัติการใช้งาน
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "users" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#E8F1FF] rounded-full grid place-items-center">
                <Users className="h-5 w-5 text-[#3B82F6]" />
              </div>
              <div>
                <div className="text-sm text-gray-600 font-kanit">ผู้ใช้งานทั้งหมด</div>
                <div className="text-2xl font-bold text-gray-900 font-kanit">{totalUsers}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#E9FBF0] rounded-full grid place-items-center">
                <UserCheck className="h-5 w-5 text-[#16A34A]" />
              </div>
              <div>
                <div className="text-sm text-gray-600 font-kanit">ผู้ใช้งานที่เปิดใช้งาน</div>
                <div className="text-2xl font-bold text-gray-900 font-kanit">{activeUsers}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#FDE8F3] rounded-full grid place-items-center">
                <UserCog className="h-5 w-5 text-[#D946AA]" />
              </div>
              <div>
                <div className="text-sm text-gray-600 font-kanit">HR Users</div>
                <div className="text-2xl font-bold text-gray-900 font-kanit">{hrUsers}</div>
              </div>
            </div>
          </div>

          {/* Users List Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* Card Header */}
            <div className="p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative w-full md:w-[420px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="ค้นหาชื่อ-นามสกุล, ชื่อผู้ใช้, หรืออีเมล..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                  className="w-full rounded-full border border-gray-200 pl-10 pr-4 py-2 text-sm font-kanit focus:outline-none focus:ring-2 focus:ring-[#F2449E]/20 focus:border-[#F2449E]" 
                />
              </div>
              <Select value={roleFilter} onValueChange={(value: "all" | "hr" | "admin") => setRoleFilter(value)}>
                <SelectTrigger className="rounded-full bg-gray-100 text-gray-700 px-4 py-2 border-0 font-kanit">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="hr">HR User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-t border-gray-100">
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">ชื่อ-นามสกุล</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">ชื่อผู้ใช้</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">อีเมล</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">บทบาท</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">หน่วยงาน</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">เข้าสู่ระบบล่าสุด</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">สถานะ</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3 text-center">การจัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <TableCell className="py-4">
                          {user.isEditing ? (
                            <Input 
                              value={user.fullName} 
                              onChange={e => handleFieldChange(user.id, "fullName", e.target.value)} 
                              className="h-8 text-sm font-kanit" 
                              placeholder="ชื่อ-นามสกุล" 
                            />
                          ) : (
                            <span className="text-sm font-kanit text-gray-900">{user.fullName}</span>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          {user.isEditing ? (
                            <Input 
                              value={user.username} 
                              onChange={e => handleFieldChange(user.id, "username", e.target.value)} 
                              className="h-8 text-sm font-kanit" 
                              placeholder="ชื่อผู้ใช้" 
                            />
                          ) : (
                            <span className="text-sm font-kanit text-gray-900">{user.username}</span>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          {user.isEditing ? (
                            <Input 
                              value={user.email} 
                              onChange={e => handleFieldChange(user.id, "email", e.target.value)} 
                              className="h-8 text-sm font-kanit" 
                              placeholder="อีเมล" 
                            />
                          ) : (
                            <span className="text-sm font-kanit text-gray-900">{user.email}</span>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          {user.isEditing ? (
                            <Select value={user.role} onValueChange={(value: "hr" | "admin") => handleFieldChange(user.id, "role", value)}>
                              <SelectTrigger className="h-8 text-sm font-kanit">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hr">HR User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge className={`font-kanit text-xs rounded-full px-3 py-0.5 ${
                              user.role === "admin" 
                                ? "bg-[#EF4343] text-white" 
                                : "bg-[#F2449E] text-white"
                            }`}>
                              {user.role === "admin" ? "Admin" : "HR User"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          {user.isEditing ? (
                            <Input 
                              value={user.department} 
                              onChange={e => handleFieldChange(user.id, "department", e.target.value)} 
                              className="h-8 text-sm font-kanit" 
                              placeholder="หน่วยงาน" 
                            />
                          ) : (
                            <span className="text-sm font-kanit text-gray-900">{user.department}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm font-kanit text-gray-900 py-4">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={user.status} 
                              onCheckedChange={checked => handleStatusToggle(user.id, checked)} 
                              className={`${user.status ? "data-[state=checked]:bg-[#22c55e]" : "data-[state=unchecked]:bg-[#ef4444]"}`} 
                            />
                            <span className={`text-xs font-kanit ${user.status ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                              {user.status ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex justify-center gap-1">
                            {user.isEditing ? (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => user.id.startsWith(Date.now().toString().slice(0, -3)) ? handleSaveNew(user.id) : handleSaveUser(user.id)} 
                                  className="h-8 w-8 p-0 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full"
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => user.id.startsWith(Date.now().toString().slice(0, -3)) ? handleCancelNew(user.id) : handleCancelEdit(user.id)} 
                                  className="h-8 w-8 p-0 rounded-full border-gray-300 text-gray-600 hover:bg-gray-100"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => handleEditUser(user.id)} 
                                  className="h-8 w-8 p-0 rounded-full border-gray-300 text-gray-600 hover:bg-gray-100"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => handleDeleteUser(user.id)} 
                                  className="h-8 w-8 p-0 rounded-full border-rose-300 text-rose-500 hover:bg-rose-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-4">
              <h3 className="font-kanit text-lg font-semibold text-gray-900 mb-4">ประวัติการใช้งาน</h3>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-t border-gray-100">
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">ผู้ใช้งาน</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">การกระทำ</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">เวลาเข้าใช้งาน</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">IP Address</TableHead>
                      <TableHead className="font-kanit text-gray-500 font-medium bg-white py-3">สถานะ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageHistory.map(record => (
                      <TableRow key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <TableCell className="text-sm font-kanit text-gray-900 py-4">
                          {record.user}
                        </TableCell>
                        <TableCell className="text-sm font-kanit text-gray-900 py-4">
                          {record.action}
                        </TableCell>
                        <TableCell className="text-sm font-kanit text-gray-900 py-4">
                          {record.timestamp}
                        </TableCell>
                        <TableCell className="text-sm font-kanit text-gray-900 py-4">
                          {record.ipAddress}
                        </TableCell>
                        <TableCell className="py-4">
                          <span className={`text-lg ${record.success ? "text-green-600" : "text-red-600"}`}>
                            {record.success ? "✅" : "❌"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent className="font-kanit">
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ที่จะลบผู้ใช้งานนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteUserId(null)}>
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              ลบผู้ใช้งาน
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;