import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../pages-area/home/home";
import { About } from "../../pages-area/about/about";
import { Page404 } from "../../pages-area/page404/page404";
import { Register } from "../../auth-area/register/register";
import { Login } from "../../auth-area/login/login";
import { VacationsList } from "../../vacations-area/vacations-list/vacations-list";
import { AdminView } from "../../admin-area/admin-list/admin-view";
import { AddVacation } from "../../admin-area/add-vacation/add-vacation";
import { EditVacation } from "../../admin-area/edit-vacation/edit-vacation";
import { Reports } from "../../admin-area/reports/reports";
import { AiPage } from "../../ai-area/ai-page/ai-page";
import { AuthGuard } from "../../auth-area/auth-guard/auth-guard";
import { McpPage } from "../../ai-area/mcp-page/mcp-page";

export function Routing() {
    return (
        <Routes>

            {/* Public: */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Registered users & AuthGuard  */}
            <Route path="/vacations" element={<AuthGuard><VacationsList /></AuthGuard>} />
            <Route path="/ai" element={<AuthGuard><AiPage /></AuthGuard>} />
            <Route path="/mcp" element={<AuthGuard><McpPage /></AuthGuard>} />

            {/* Admin only & AuthGuard */}
            <Route path="/admin" element={<AuthGuard adminOnly><AdminView /></AuthGuard>} />
            <Route path="/admin/add" element={<AuthGuard adminOnly><AddVacation /></AuthGuard>} />
            <Route path="/admin/edit/:vacationId" element={<AuthGuard adminOnly><EditVacation /></AuthGuard>} />
            <Route path="/admin/reports" element={<AuthGuard adminOnly><Reports /></AuthGuard>} />

            {/* Default route: */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Page not found: */}
            <Route path="*" element={<Page404 />} />

        </Routes>
    );
}