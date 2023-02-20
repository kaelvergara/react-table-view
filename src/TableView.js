import React, { useState, useEffect, useMemo } from "react";
import { useUserCoursesData, useCurrenciesData } from "./api";

const TableView = () => {
  const { userCoursesData } = useUserCoursesData();
  const {
    currenciesData,
    exchangeRate,
    fetchExchangeRate,
    exchangeRateError
  } = useCurrenciesData();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleSort = (columnName) => {
    setSortColumn(columnName);
    setSortDirection(sortDirection * -1);
  };

  const userCourses = useMemo(() => {
    return (
      userCoursesData
        // PHASE 2: Fuzzy Search
        .filter((user) => {
          const sq = searchQuery.toLowerCase();
          return (
            user.name.toLowerCase().includes(sq) ||
            user.phone.toLowerCase().includes(sq) ||
            user.email.toLowerCase().includes(sq)
          );
        })
        // PHASE 3: Table Sorting (Ascending/Descending)
        .sort((a, b) => {
          if (sortColumn) {
            const compareResult = a[sortColumn].localeCompare(b[sortColumn]);
            // if phone and email is the same then use name for comparison
            if (
              compareResult === 0 &&
              (sortColumn === "phone" || sortColumn === "email")
            ) {
              return a.name.localeCompare(b.name) * sortDirection;
            } else {
              return compareResult * sortDirection;
            }
          } else {
            // no default sort
            return 0;
          }
        })
        // PHASE 5: Convert currency data
        .map((user) => {
          return {
            ...user,
            courses: user.courses.map((course) => {
              return {
                ...course,
                semester_fee: course.semester_fee * exchangeRate
              };
            })
          };
        })
    );
  }, [userCoursesData, searchQuery, sortColumn, sortDirection, exchangeRate]);

  useEffect(() => {
    fetchExchangeRate(selectedCurrency);
  }, [fetchExchangeRate, selectedCurrency]);

  const renderSortIcon = (columnName) => {
    return (
      sortColumn === columnName && (
        <div className={`sort-icon ${sortDirection === -1 ? "desc" : ""}`}>
          ^
        </div>
      )
    );
  };

  return (
    <div>
      <div>
        Search:
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
      <div>
        Currency:
        <select value={selectedCurrency} onChange={handleCurrencyChange}>
          {Object.values(currenciesData).map((currency) => {
            return (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            );
          })}
        </select>
      </div>
      {exchangeRateError && <h3>Unsupported currency type</h3>}
      {!exchangeRateError && (
        <table>
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort("name")}>
                Name {renderSortIcon("name")}
              </th>
              <th className="sortable" onClick={() => handleSort("phone")}>
                Phone {renderSortIcon("phone")}
              </th>
              <th className="sortable" onClick={() => handleSort("email")}>
                Email {renderSortIcon("email")}
              </th>
              <th>Courses Name</th>
              <th>Courses Selection</th>
              <th>Semester</th>
              <th>Semester Fee</th>
            </tr>
          </thead>
          <tbody>
            {userCourses.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td style={{ padding: 0 }} colSpan="4">
                    <table>
                      <tbody>
                        {/* im not sure if this is actually needed */}
                        {/* <tr>
                          <td colSpan="4">&nbsp;</td>
                        </tr> */}
                        {user.courses.map((course) => {
                          return (
                            <tr key={course.id}>
                              <td>{course.course_selection}</td>
                              <td>{course.course_name}</td>
                              <td>{course.semester}</td>
                              <td>{course.semester_fee}</td>
                            </tr>
                          );
                        })}
                        {user.courses.length <= 0 && (
                          <tr>
                            <td colSpan="4">No data found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableView;
