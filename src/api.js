import { useState, useEffect } from "react";

const USERS_URL =
  "https://gist.githubusercontent.com/JCGonzaga01/36a8af85464d998221c71ea3eaa57225/raw/6fe851e029ee98e9ec85ceb87433ed5ed0f06e36/users.json";
const COURSES_URL =
  "https://gist.githubusercontent.com/JCGonzaga01/9c9e3590fb23274263678b6c4bcf9963/raw/600c8281f9db7eaba959a732912eba350bf7387d/user-course-selection.json";
const CURRENCIES_URL =
  "https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json";
const WORKING_API_KEY = "05845d21c07e0c0488eae982";
const NOT_WORKING_API_KEY = "3d609826d7238787d81cfc47";
const EXCHANGE_RATE_URL = `https://v6.exchangerate-api.com/v6/${WORKING_API_KEY}/pair/USD`;

export const useUserCoursesData = () => {
  const [userCoursesData, setUserCoursesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const usersData = await (await fetch(USERS_URL)).json();
      const coursesData = await (await fetch(COURSES_URL)).json();

      // PHASE 1: Table structure
      // flatten table for easier rendering
      const userCourses = usersData.map((user) => {
        const courses = coursesData
          .filter((courses) => courses.user_id === user.id)
          // PHASE 4: Clean data
          // filter course if it has same course_selection, course_name, semester
          .filter((obj, index, arr) => {
            return (
              index ===
              arr.findIndex((o) => {
                return (
                  o.course_selection === obj.course_selection &&
                  o.course_name === obj.course_name &&
                  o.semester === obj.semester
                );
              })
            );
          });

        return {
          ...user,
          courses
        };
      });

      setUserCoursesData(userCourses);
    }

    fetchData();
  }, []);

  return {
    userCoursesData
  };
};

export const useCurrenciesData = () => {
  const [currenciesData, setCurrenciesData] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [exchangeRateError, setExchangeRateError] = useState(null);

  async function fetchExchangeRate(currency) {
    const exchangeRateData = await (
      await fetch(`${EXCHANGE_RATE_URL}/${currency}`)
    ).json();
    if (exchangeRateData.result === "success") {
      setExchangeRate(exchangeRateData.conversion_rate);
      setExchangeRateError(null);
    } else {
      setExchangeRateError("unsupported_code");
    }
  }

  useEffect(() => {
    async function fetchData() {
      const currenciesData = await (await fetch(CURRENCIES_URL)).json();
      setCurrenciesData(currenciesData);
    }
    fetchData();
  }, []);

  return {
    currenciesData,
    exchangeRate,
    fetchExchangeRate,
    exchangeRateError
  };
};
