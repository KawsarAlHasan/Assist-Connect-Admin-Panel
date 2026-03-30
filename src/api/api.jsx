import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const BASE_URL = "https://harryapi.dsrt321.online";

export const API = axios.create({
  baseURL: BASE_URL + "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// sign out
export const signOutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("adminProfile");
  localStorage.removeItem("profileTimestamp");
  window.location.href = "/login";
};

// get admin dashboard
export const useDashboardData = () => {
  const getData = async () => {
    // const response = await API.get("/dashboard/stats/");
    const response = await axios.get("/dashboard.json");
    return response.data;
  };

  const {
    data: dashboardData = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getData,
  });

  return { dashboardData, isLoading, isError, error, refetch };
};

// get admin dashboard
export const useChatGrowth = (type) => {
  const getData = async () => {
    const response = await API.get(`/dashboard/chat-growth/${type}/`);
    return response.data.data;
  };

  const {
    data: growthData = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["growthData", type],
    queryFn: getData,
  });

  return { growthData, isLoading, isError, error, refetch };
};

// get all users
export const useAllUsersList = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(`/user-management/users/`, {
      params: {
        page,
        limit,
      },
    });

    return response.data.data;
  };

  const {
    data: allUsersList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsersList", page, limit],
    queryFn: getData,
  });

  return { allUsersList, isLoading, isError, error, refetch };
};

// get all admins
export const useAllAdmins = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(`/administrators/admins/`, {
      params: {
        page,
        limit,
      },
    });

    return response.data.data;
  };

  const {
    data: admins = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admins", page, limit],
    queryFn: getData,
  });

  return { admins, isLoading, isError, error, refetch };
};

// administrators
export const getMockAdministrators = async () => {
  const response = await axios.get("/administrators_8.json");

  return response.data;
};

export const useAdministrators = () => {
  const {
    data: administrators = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["administrators"],
    queryFn: getMockAdministrators,
  });

  return { administrators, isLoading, isError, error, refetch };
};

// users list
export const getMockUsers = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/users_100.json");

  const allUsers = res.data || [];

  // Fake filtering (if status or role is provided)
  let filteredUsers = allUsers;

  // Fake pagination
  const totalUser = filteredUsers.length;
  const totalPages = Math.ceil(totalUser / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedUsers,
    pagination: {
      totalUser,
      page,
      limit,
      totalPages,
    },
  };
};

export const useAllUsers = (params) => {
  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", params],
    queryFn: () => getMockUsers(params),
    keepPreviousData: true,
  });

  const { data: allUsers = [], pagination = {} } = response;

  return { allUsers, pagination, isLoading, isError, error, refetch };
};
