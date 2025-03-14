
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animation/FadeIn";

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Handle checkout process
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to checkout",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);

    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Checkout Successful",
        description: "Your courses have been purchased successfully!",
      });

      // Clear the cart after successful checkout
      clearCart();

      // In a real app, you would redirect to a success page or enrolled courses
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your checkout",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cartItems.length > 0
                  ? `You have ${cartItems.length} course${cartItems.length > 1 ? "s" : ""} in your cart`
                  : "Your cart is empty"}
              </p>
            </div>

            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Course</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cartItems.map((course) => (
                            <TableRow key={course.id}>
                              <TableCell>
                                <div className="flex items-center space-x-4">
                                  <div className="h-16 w-24 rounded overflow-hidden">
                                    <img
                                      src={course.image}
                                      alt={course.title}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <Link 
                                      to={`/courses/${course.id}`}
                                      className="font-medium hover:text-primary transition-colors"
                                    >
                                      {course.title}
                                    </Link>
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                      {course.level && <span>{course.level}</span>}
                                      {course.category && (
                                        <>
                                          <span>•</span>
                                          <span>{course.category}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{course.instructor}</TableCell>
                              <TableCell className="text-right font-medium">
                                ${course.price}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFromCart(course.id)}
                                  aria-label={`Remove ${course.title} from cart`}
                                >
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between p-6 pt-0">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline">Clear Cart</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Clear Shopping Cart</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove all items from your cart? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={clearCart}>
                              Clear Cart
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button asChild>
                        <Link to="/courses">Continue Shopping</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Discount</span>
                          <span>$0.00</span>
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button 
                        className="w-full" 
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                      >
                        {isCheckingOut ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            Checkout
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-muted">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any courses to your cart yet.
                </p>
                <Button asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </div>
            )}
          </FadeIn>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;
