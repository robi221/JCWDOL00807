import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Icon } from "@iconify/react";
import CurrencyFormat from "react-currency-format";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(...registerables);


const AdminHome = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [dataChart, setDataChart] = useState({});
  const [topBranch, setTopBranch] = useState(null);
  const [topProduct, setTopProduct] = useState(null);
  const [totalStats, setTotalStats] = useState(null);
  const [branchName, setBranchName] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [dataBranchTransaction, setDataBranchTransaction] = useState(null);
  const [dataDone, setDataDone] = useState(false);

  const dailySaleChart = () => {
    if (dataChart?.length == 0) {
      return <div>Loading...</div>;
    } else {
      const labels = [
        dataChart[0]?.stat_day,
        dataChart[1]?.stat_day,
        dataChart[2]?.stat_day,
        dataChart[3]?.stat_day,
        dataChart[4]?.stat_day,
        dataChart[5]?.stat_day,
        dataChart[6]?.stat_day,
      ];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Revenue Last 7 Days(in Rupiahs)  ",
            backgroundColor: "hsl(217, 57%, 51%)",
            borderColor: "hsl(217, 57%, 51%)",
            data: [
              dataChart[0]?.sales,
              dataChart[1]?.sales,
              dataChart[2]?.sales,
              dataChart[3]?.sales,
              dataChart[4]?.sales,
              dataChart[5]?.sales,
              dataChart[6]?.sales,
            ],
          },
        ],
      };

      const configLineChart = {
        type: "line",
        data,
        options: {},
      };

      let dailySale = new ChartJS(
        document.getElementById("dailySale"),
        configLineChart
      );
    }
  };
  const dailyOrderChart = () => {
    const labels = [
      dataChart[0]?.stat_day,
      dataChart[1]?.stat_day,
      dataChart[2]?.stat_day,
      dataChart[3]?.stat_day,
      dataChart[4]?.stat_day,
      dataChart[5]?.stat_day,
      dataChart[6]?.stat_day,
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Quantity Order in Last 7 Days ",
          backgroundColor: "hsl(217, 57%, 51%)",
          borderColor: "hsl(217, 57%, 51%)",
          data: [
            dataChart[0]?.total_order,
            dataChart[1]?.total_order,
            dataChart[2]?.total_order,
            dataChart[3]?.total_order,
            dataChart[4]?.total_order,
            dataChart[5]?.total_order,
            dataChart[6]?.total_order,
          ],
        },
      ],
    };

    const configLineChart = {
      type: "line",
      data,
      options: {},
    };

    let dailyOrder = new ChartJS(
      document.getElementById("dailyOrder"),
      configLineChart
    );
  };
  const dailyProductSoldChart = () => {
    const labels = [
      dataChart[0]?.stat_day,
      dataChart[1]?.stat_day,
      dataChart[2]?.stat_day,
      dataChart[3]?.stat_day,
      dataChart[4]?.stat_day,
      dataChart[5]?.stat_day,
      dataChart[6]?.stat_day,
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Quantity Product Sold in Last 7 Days ",
          backgroundColor: "hsl(217, 57%, 51%)",
          borderColor: "hsl(217, 57%, 51%)",
          data: [
            dataChart[0]?.total_product,
            dataChart[1]?.total_product,
            dataChart[2]?.total_product,
            dataChart[3]?.total_product,
            dataChart[4]?.total_product,
            dataChart[5]?.total_product,
            dataChart[6]?.total_product,
          ],
        },
      ],
    };

    const configLineChart = {
      type: "line",
      data,
      options: {},
    };

    let dailyProductSold = new ChartJS(
      document.getElementById("dailyProductSold"),
      configLineChart
    );
  };
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // const role = localStorage.getItem("role");
    // console.log(token, role);
    // setRole(role);

    let getDataDashboard = async () => {
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/getDataDashboard`,
          {
            headers: {
              // Authorization: `${token}`,
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbnNfaWQiOjEsIm5hbWUiOiJhZ3VzIiwiZW1haWwiOiJhZ3VzQG1haWwuY29tIiwicm9sZSI6ImFkbWluIGJyYW5jaCIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2Nzk1Nzg3NzIsImV4cCI6MTY3OTc1MTU3Mn0.6Cyuzp1xqlGmQByTyX3XMtmMtLPiykGHoXuLWcKO9ok",

            },
          }
        );
        console.log(response.data.data);
        await setDataChart(response?.data?.data?.dataChart);
        setTopBranch(response?.data?.data?.topBranch);
        setTopProduct(response?.data?.data?.topProduct);
        console.log(response?.data?.data?.totalStats[0]);
        setTotalStats(response?.data?.data?.totalStats[0]);
        console.log(response?.data?.data?.branchName);
        setBranchName(response?.data?.data?.branchName[0]);
        setIsActive(response?.data?.data?.isActive);
        setAdminRole(response?.data?.data?.role);
        setDataBranchTransaction(response?.data?.data?.dataBranchTransaction);
        setDataDone(true);

        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    // getDataDashboard();
    // if (!token) {
    //   navigate("/admin/login");
    // }
  }, []);
  // useEffect(() => {
  // dailySaleChart();
  // dailyOrderChart();
  // dailyProductSoldChart();
  // }, [dataDone]);
  return (
    <div>
      <SidebarAdmin />

      <div className="p-4 sm:ml-64">
        <Navbar />

        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6 mb-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-black text-xl ml-0.5">
              {adminRole == "admin branch"
                ? `GoKu - Branch ${branchName?.name} `
                : "Goku - Super Admin"}
            </h2>
          </div>
        </div>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <Icon icon="ph:users-four" className="h-12 w-12" />
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {totalStats?.total_users}
              </span>
              <span className="block text-gray-500">Total Users</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 mr-6">
              <Icon icon="ph:currency-circle-dollar" className="w-16 h-16" />
            </div>
            <div>
              <span className="block text-2xl font-bold">
                <CurrencyFormat
                  value={totalStats?.total_sales}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp"}
                />
              </span>
              <span className="block text-gray-500">Total Earning</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600  mr-6">
              <Icon icon="fluent-mdl2:activate-orders" className="h-16 w-16" />
            </div>
            <div>
              <span className="inline-block text-2xl font-bold">
                {totalStats?.total_order}
              </span>
              <span className="block text-gray-500">Total Orders</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600  mr-6">
              <Icon
                icon="carbon:shopping-cart-arrow-down"
                className="h-16 w-16"
              />
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {totalStats?.total_product_sold}
              </span>
              <span className="block text-gray-500">Total Product Sold</span>
            </div>
          </div>
        </section>
        {branchName?.name ? null : (
          <div className="flex justify-between bg-gray-100 py-10 p-5">
            <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
              <div className="w-11/12 mx-auto">
                <div className="bg-white my-6">
                  <table className="text-left w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="py-4 px-6 bg-red-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                          TOP - ADMIN BRANCH
                        </th>
                        <th className="py-4 px-6 text-center bg-red-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                          TOTAL SALES
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topBranch?.map((value, index) => {
                        return (
                          <>
                            <tr className="hover:bg-grey-lighter font-bold">
                              <td className="py-4 px-6 border-b border-grey-light">
                                {value?.admin_name}
                              </td>
                              <td className="py-4 px-6 text-center border-b border-grey-light">
                                <CurrencyFormat
                                  value={value?.sales}
                                  displayType={"text"}
                                  thousandSeparator={"."}
                                  decimalSeparator={","}
                                  prefix={"Rp"}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="container mr-5 mx-auto bg-white shadow-xl">
              <div className="w-11/12 mx-auto">
                <div className="bg-white my-6">
                  <table className="text-left w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="py-4 px-6 bg-red-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                          TOP THREE PRODUCTS
                        </th>
                        <th className="py-4 px-6 text-center bg-red-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                          QUANTITY
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProduct?.map((value, index) => {
                        return (
                          <>
                            <tr className="hover:bg-grey-lighter font-bold">
                              <td className="py-4 px-6 border-b border-grey-light">
                                {value?.product_name}
                              </td>
                              <td className="py-4 px-6 text-center border-b border-grey-light">
                                {value?.qty}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between my-5">
          <div className="overflow-hidden rounded-lg shadow-lg w-1/2">
            <div className="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-black-200 text-2xl font-bold">
              Daily Sale Chart
            </div>
            <canvas className="p-10" id="dailySale"></canvas>
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg w-1/2">
            <div className="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-black-200 text-2xl font-bold">
              Daily Order Chart
            </div>
            <canvas className="p-10" id="dailyOrder"></canvas>
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg w-1/2">
            <div className="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-black-200 text-2xl font-bold">
              Daily Product Sold Chart
            </div>
            <canvas className="p-10" id="dailyProductSold"></canvas>
          </div>
        </div>
        {branchName?.name ? (
          <>
            <div className="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-black-200 text-2xl font-bold">
              <center>Transaction</center>
            </div>
            <section className="container px-4 mx-auto mb-5">
              <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <div className="flex items-center gap-x-3">
                                <input
                                  type="checkbox"
                                  className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                />
                                <button className="flex items-center gap-x-2">
                                  <span>Transactions ID</span>

                                  <svg
                                    className="h-3"
                                    viewBox="0 0 10 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                      fill="currentColor"
                                      stroke="currentColor"
                                      stroke-width="0.1"
                                    />
                                    <path
                                      d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                      fill="currentColor"
                                      stroke="currentColor"
                                      stroke-width="0.1"
                                    />
                                    <path
                                      d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                      fill="currentColor"
                                      stroke="currentColor"
                                      stroke-width="0.3"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Customer Name
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Date
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Product Name
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {dataBranchTransaction?.map((value, index) => {
                            return (
                              <>
                                <tr>
                                  <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                      <input
                                        type="checkbox"
                                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                      />

                                      <span>{value?.id}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                      <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                        {value?.name}
                                      </h2>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    {value?.Date}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    {value?.purchase}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <CurrencyFormat
                                      value={value?.total_price}
                                      displayType={"text"}
                                      thousandSeparator={"."}
                                      decimalSeparator={","}
                                      prefix={"Rp"}
                                    />
                                  </td>
                                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    {value?.status === "Waiting For Payment" ? (
                                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 dark:bg-gray-800">
                                        <h2 className="text-sm font-normal">
                                          {value?.status}
                                        </h2>
                                      </div>
                                    ) : value?.status === "Canceled" ? (
                                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800">
                                        <h2 className="text-sm font-normal">
                                          {value?.status}
                                        </h2>
                                      </div>
                                    ) : (
                                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                        <h2 className="text-sm font-normal">
                                          {value?.status}
                                        </h2>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center justify-between mt-6 mb-10">
                <a
                  href="true"
                  className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>previous</span>
                </a>

                <div className="items-center hidden md:flex gap-x-3">
                  <a
                    href="true"
                    className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                  >
                    1
                  </a>
                  <a
                    href="true"
                    className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >
                    2
                  </a>
                  <a
                    href="true"
                    className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >
                    3
                  </a>
                  <a
                    href="true"
                    className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >
                    ...
                  </a>
                  <a
                    href="true"
                    className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >
                    12
                  </a>
                  <a
                    href="true"
                    className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >
                    13
                  </a>
                  <a
                    href="true"
                    className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >
                    14
                  </a>
                </div>

                <a
                  href="true"
                  className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <span>Next</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </a>
              </div> */}
            </section>
          </>
        ) : null}

        <Footer />
      </div>
    </div>
  );
};
export default AdminHome;
