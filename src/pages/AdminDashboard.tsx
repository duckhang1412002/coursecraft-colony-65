
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  UserCog, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  UserX,
  UserCheck,
  BookOpenCheck,
  FileCheck,
  BarChart3,
  PieChart as PieChartIcon,
  RefreshCcw
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FadeIn from "@/components/animation/FadeIn";
import { useToast } from "@/hooks/use-toast";

// Mock data
const USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "student", courses: 3, lastActive: "2023-06-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "teacher", courses: 5, lastActive: "2023-06-18" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "student", courses: 2, lastActive: "2023-06-14" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "teacher", courses: 7, lastActive: "2023-06-17" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "student", courses: 4, lastActive: "2023-06-16" },
  { id: 6, name: "Diana Prince", email: "diana@example.com", role: "student", courses: 6, lastActive: "2023-06-15" },
  { id: 7, name: "Edward Norton", email: "edward@example.com", role: "teacher", courses: 3, lastActive: "2023-06-18" },
  { id: 8, name: "Fiona Apple", email: "fiona@example.com", role: "student", courses: 2, lastActive: "2023-06-14" },
];

const COURSES = [
  { id: 1, title: "Web Development Bootcamp", teacher: "Jane Smith", students: 245, completion: 68, revenue: 12250 },
  { id: 2, title: "Machine Learning Fundamentals", teacher: "Alice Williams", students: 180, completion: 72, revenue: 9000 },
  { id: 3, title: "Mobile App Development", teacher: "Edward Norton", students: 120, completion: 65, revenue: 6000 },
  { id: 4, title: "Data Science with Python", teacher: "Alice Williams", students: 210, completion: 75, revenue: 10500 },
  { id: 5, title: "UX/UI Design Principles", teacher: "Jane Smith", students: 150, completion: 80, revenue: 7500 },
];

// Chart data
const userRoleData = [
  { name: "Students", value: 650 },
  { name: "Teachers", value: 45 },
  { name: "Admins", value: 5 },
];

const courseCreationData = [
  { name: "Jan", courses: 15 },
  { name: "Feb", courses: 18 },
  { name: "Mar", courses: 25 },
  { name: "Apr", courses: 22 },
  { name: "May", courses: 30 },
  { name: "Jun", courses: 27 },
];

const revenueData = [
  { name: "Jan", revenue: 12500 },
  { name: "Feb", revenue: 15000 },
  { name: "Mar", revenue: 18500 },
  { name: "Apr", revenue: 17000 },
  { name: "May", revenue: 22000 },
  { name: "Jun", revenue: 19500 },
];

const enrollmentData = [
  { name: "Jan", enrollments: 120 },
  { name: "Feb", enrollments: 145 },
  { name: "Mar", enrollments: 165 },
  { name: "Apr", enrollments: 155 },
  { name: "May", enrollments: 180 },
  { name: "Jun", enrollments: 170 },
];

const courseCompletionData = [
  { name: "Completed", value: 35 },
  { name: "In Progress", value: 45 },
  { name: "Not Started", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleChangeDialogOpen, setIsRoleChangeDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  
  // Filter users based on search term and role filter
  useEffect(() => {
    let result = USERS;
    
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (roleFilter !== "all") {
      result = result.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(result);
  }, [searchTerm, roleFilter]);
  
  const handleEditUser = (user: any) => {
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteUser = (user: any) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  const handleRoleChange = (user: any) => {
    setCurrentUser(user);
    setNewRole(user.role);
    setIsRoleChangeDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, this would call an API to delete the user
    toast({
      title: "User Deleted",
      description: `${currentUser.name} has been deleted successfully.`,
    });
    
    // Update the UI
    setFilteredUsers(filteredUsers.filter(u => u.id !== currentUser.id));
    setIsDeleteDialogOpen(false);
  };
  
  const confirmRoleChange = () => {
    // In a real app, this would call an API to update the user's role
    toast({
      title: "Role Updated",
      description: `${currentUser.name}'s role has been updated to ${newRole}.`,
    });
    
    // Update the UI
    setFilteredUsers(filteredUsers.map(u => 
      u.id === currentUser.id ? { ...u, role: newRole } : u
    ));
    setIsRoleChangeDialogOpen(false);
  };
  
  const saveUserChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user
    toast({
      title: "User Updated",
      description: "User information has been updated successfully.",
    });
    setIsEditDialogOpen(false);
  };
  
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your platform, users, and view analytics
                </p>
              </div>
            </div>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-8"
            >
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Users
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">700</div>
                      <p className="text-xs text-muted-foreground">
                        +12% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Courses
                      </CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">152</div>
                      <p className="text-xs text-muted-foreground">
                        +8% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Enrollments
                      </CardTitle>
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,245</div>
                      <p className="text-xs text-muted-foreground">
                        +18% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231</div>
                      <p className="text-xs text-muted-foreground">
                        +15% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-6 mt-8 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>User Roles Distribution</CardTitle>
                        <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardDescription>
                        Breakdown of users by their roles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={userRoleData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {userRoleData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} users`, ""]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Course Completion Rates</CardTitle>
                        <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardDescription>
                        Overall completion status of courses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={courseCompletionData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {courseCompletionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, ""]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-6 mt-8 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Monthly Course Creation</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardDescription>
                        Number of new courses created per month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={courseCreationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`${value} courses`, "New Courses"]} />
                            <Bar dataKey="courses" fill="#0088FE" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Monthly Revenue</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardDescription>
                        Total revenue generated per month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                            <Bar dataKey="revenue" fill="#00C49F" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Users Tab */}
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      View and manage all users on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                      <div className="relative w-full sm:w-auto flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      <Select
                        value={roleFilter}
                        onValueChange={setRoleFilter}
                      >
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="student">Students</SelectItem>
                          <SelectItem value="teacher">Teachers</SelectItem>
                          <SelectItem value="admin">Admins</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" onClick={() => {
                        setSearchTerm("");
                        setRoleFilter("all");
                      }}>
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                      
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                    
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Courses</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    user.role === "admin"
                                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
                                      : user.role === "teacher"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                                      : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                  }`}>
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell>{user.courses}</TableCell>
                                <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRoleChange(user)}
                                    >
                                      <UserCog className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleEditUser(user)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                      onClick={() => handleDeleteUser(user)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="h-24 text-center">
                                No users found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Courses Tab */}
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>
                      View and manage all courses on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                      <div className="relative w-full sm:w-auto flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search courses..."
                          className="pl-8"
                        />
                      </div>
                      
                      <Button variant="outline">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                      
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Course
                      </Button>
                    </div>
                    
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Completion</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {COURSES.map((course) => (
                            <TableRow key={course.id}>
                              <TableCell className="font-medium">{course.title}</TableCell>
                              <TableCell>{course.teacher}</TableCell>
                              <TableCell>{course.students}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress value={course.completion} className="h-2 w-20" />
                                  <span className="text-sm">{course.completion}%</span>
                                </div>
                              </TableCell>
                              <TableCell>${course.revenue}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      window.open(`/courses/${course.id}`, "_blank");
                                    }}
                                  >
                                    <BookOpenCheck className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </main>
        
        <Footer />
        
        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to the user's information.
              </DialogDescription>
            </DialogHeader>
            
            {currentUser && (
              <form onSubmit={saveUserChanges}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={currentUser.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue={currentUser.email}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select defaultValue={currentUser.role}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Delete User Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {currentUser && (
                <div className="p-4 border rounded-md mb-4">
                  <p><strong>Name:</strong> {currentUser.name}</p>
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <p><strong>Role:</strong> {currentUser.role}</p>
                </div>
              )}
              <div className="flex items-center bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-700 dark:text-red-300">
                <UserX className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">This will permanently delete the user's account and all associated data.</p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDelete}
              >
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Change Role Dialog */}
        <Dialog open={isRoleChangeDialogOpen} onOpenChange={setIsRoleChangeDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change User Role</DialogTitle>
              <DialogDescription>
                Update the user's role and permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {currentUser && (
                <div className="p-4 border rounded-md mb-4">
                  <p><strong>Name:</strong> {currentUser.name}</p>
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <p><strong>Current Role:</strong> {currentUser.role}</p>
                </div>
              )}
              <div className="space-y-4">
                <Label htmlFor="new-role">New Role</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger id="new-role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-blue-700 dark:text-blue-300">
                  <UserCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Changing a user's role will update their permissions and access to features.</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsRoleChangeDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmRoleChange}
              >
                Update Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
