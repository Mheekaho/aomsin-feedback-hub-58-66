import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart3 } from "lucide-react";

export const ChartPlaceholders = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="shasha">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              ประเภทของสาขา
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center space-y-2">
                <PieChart className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">โดนัทชาร์ต</p>
                <p className="text-xs text-muted-foreground">กำลังพัฒนา...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="shasha">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              ประเภทการใช้บริการ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">กราฟแท่ง</p>
                <p className="text-xs text-muted-foreground">กำลังพัฒนา...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>  
  );
};