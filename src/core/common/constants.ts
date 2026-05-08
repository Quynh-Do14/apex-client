import { ROUTE_PATH } from "./appRouter";
import dynamic from "@/assets/images/botFace/dynamic.jpg";
import friendly from "@/assets/images/botFace/friendly.jpg";
import serious from "@/assets/images/botFace/serious.jpg";
import happy from "@/assets/images/botFace/happy.jpg";
import strict from "@/assets/images/botFace/strict.jpg";
import quiet from "@/assets/images/botFace/quiet.jpg";
export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Quản lý người dùng",
                link: ROUTE_PATH.USER_MANAGEMENT,
                icon: "fa fa-user" // Icon thư mục
            },
            {
                label: "Quản lý danh mục",
                link: ROUTE_PATH.BLOG_CATEGORY_MANAGEMENT,
                icon: "fa fa-folder-open" // Icon thư mục
            },
            {
                label: "Quản lý bài viết",
                link: ROUTE_PATH.BLOG_MANAGEMENT,
                icon: "fa fa-newspaper" // Icon bài viết
            },
            {
                label: "Quản lý tin tức nội bộ",
                link: ROUTE_PATH.INTERNAL_BLOG_MANAGEMENT,
                icon: "fa fa-file-text-o" // Icon bài viết
            },
            {
                label: "Quản lý video",
                link: ROUTE_PATH.VIDEO_MANAGEMENT,
                icon: "fa fa-file-video-o" // Icon bài viết
            },
        ]
    };

    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Role = class {
        static List = [
            { label: "Quản trị viên", value: "admin" },
            { label: "Người dùng", value: "user" },
        ]
    }

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static search = "search";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

    static PaginationClientConfigs = class {
        static Size = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "8", value: 8 },
            { label: "16", value: 16 },
            { label: "48", value: 48 },
        ]
    };

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }

    static TimeFilter = class {
        static List = [
            { label: "Ngày", value: "daily" },
            { label: "Tuần", value: "weekly" },
            { label: "Tháng", value: "monthly" },
            { label: "Lựa chọn thời gian", value: "" },
        ]
    }
    static BannerType = class {
        static List = [
            {
                label: 'Banner chính',
                value: "MAIN_BANNER"
            },
            {
                label: 'Banner phụ',
                value: "SUB_BANNER"
            }
        ]
        static BannerTypeConfig = class {
            static Main = {
                label: 'Banner chính',
                value: "MAIN_BANNER"
            }
            static Sub = {
                label: 'Banner phụ',
                value: "SUB_BANNER"
            }
        }
    }

};