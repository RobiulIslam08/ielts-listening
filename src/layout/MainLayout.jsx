
// MainLayout.js
import { Outlet } from "react-router-dom";




// এই লেআউটে কোনো ধরনের লোডিং লজিক বা setTimeout থাকবে না।
const MainLayout = () => {
  return (
    <div className="aurora-background">
     
      <main>
        {/* এখানে HomePage বা অন্যান্য পেজ সরাসরি রেন্ডার হবে */}
        <Outlet /> 
      </main>

    </div>
  );
};

export default MainLayout;