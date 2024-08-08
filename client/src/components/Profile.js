import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateDate } from "./UtilityFunctions";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "./FakeStackOverflow";
import LinkButton from "./LinkButton";

export default function Profile() {
  const { viewedUserID } = useParams();
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState();
  const [viewedUser, setViewedUser] = useState();
  const [toggle, setToggle] = useState("user/questions");
  const fetchAllUsers = async () => {
    const res = await axios.get("http://localhost:8000/users/api/fetchAllUsers");
    setAllUsers(res.data);
    console.log("WHAT ARE U ", res.data);
  };

  const fetchViewedUser = async () => {
    const res = await axios.get("http://localhost:8000/users/api/fetchUser/" + viewedUserID);
    setViewedUser(res.data);
  };
  useEffect(() => {
    fetchViewedUser();
  }, [viewedUserID]);

  useEffect(() => {
    if (viewedUser && viewedUser.admin) {
      fetchAllUsers();
    }
  }, [viewedUser]);

  function handleToggle(category) {
    setToggle(category);
    if (category !== "user/questions" && category !== "admin/allUsers") {
      navigate(`/${category + "/" + viewedUser._id}`);
    }
  }

  return (
    <>
      {viewedUser ? (
        <div className="profile">
          <div className="profile__user-info">
            <div
              style={{
                border: `2.5px solid ${isDark ? "lightgray" : "black"}`,
                width: "fit-content",
                height: "fit-content",
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200px"
                height="200px"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"
                  fill={isDark ? "lightgray" : "black"}
                />
                <path
                  d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
                  fill={isDark ? "lightgray" : "black"}
                />
              </svg>
            </div>
            <div className="profile__user-stats">
              <div className="profile__username">{viewedUser.username}</div>
              <div className="profile__acc-age">{`Joined ${calculateDate(
                viewedUser.acc_created_time
              )}`}</div>
              <div className="profile__acc-rep-cont">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isDark ? "lightgray" : "black"}
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24">
                  <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z" />
                </svg>
                <div style={{ marginLeft: 5 }}>{viewedUser.reputation}</div>
              </div>
            </div>
          </div>

          <div className="profile__menu">
            {viewedUser.admin ? (
              <button
                className={`category-button ${
                  toggle === "admin/allUsers" ? "category-button--highlighted" : "--not-highlight"
                }`}
                onClick={() => handleToggle("admin/allUsers")}>
                Users
              </button>
            ) : null}
            <button
              className={`category-button ${
                toggle === "user/questions" ? "category-button--highlighted" : "--not-highlight"
              }`}
              onClick={() => handleToggle("user/questions")}>
              Questions
            </button>
            <button
              className={`category-button ${
                toggle === "user/tags" ? "category-button--highlighted" : "--not-highlight"
              }`}
              onClick={() => handleToggle("user/tags")}>
              Tags
            </button>
            <button
              className={`category-button ${
                toggle === "user/answers" ? "category-button--highlighted" : "--not-highlight"
              }`}
              onClick={() => handleToggle("user/answers")}>
              Answers
            </button>
          </div>
          {toggle === "user/questions" && (
            <div
              className="profile__questions"
              style={{ border: `2.5px solid ${isDark ? "lightgray" : "black"}` }}>
              {viewedUser.userQuestions &&
                viewedUser.userQuestions.map((question, index) => (
                  <ProfileData key={index} item={question} isDark={isDark} type="question" />
                ))}
            </div>
          )}
          {toggle === "admin/allUsers" && (
            <div
              className="admin-profile__users"
              style={{ border: `2.5px solid ${isDark ? "lightgray" : "black"}` }}>
              {allUsers &&
                allUsers.map((user, index) => (
                  <ProfileData key={index} item={user} isDark={isDark} type="user" />
                ))}
              {allUsers && allUsers.length === 0 ? (
                <div>There are no users in the database</div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

function ProfileData({ item, isDark, type }) {
  async function deleteUser() {
    try {
      const res = await axios.delete("http://localhost:8000/users/api/deleteUser/" + item._id);
      console.log(res.data);
    } catch (err) {
      console.log("Unable to delete user");
    }
  }

  return (
    <div className="profile__question-cont">
      <div className="profile__question-rep">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isDark ? "lightgray" : "black"}
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 24 24">
          <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z" />
        </svg>
        {type === "question" ? item.upvotes : item.reputation}
      </div>
      <div className="profile__question-text">
        {/*Unsafe to use database identifier but its ok for now, bc its unique and used to fetch question to edit*/}
        <Link
          to={type === "question" ? `/questions/edit/${item._id}` : `/users/profile/${item._id}`}
          reloadDocument>
          {type === "question" ? item.title : item.username}
        </Link>
      </div>
      {type === "question" ? (
        <div>{calculateDate(item.ask_date_time)}</div>
      ) : (
        <LinkButton
          text="Delete User"
          handleOnClick={deleteUser}
          destination={`/users/profile/${item._id}`}
        />
      )}
    </div>
  );
}
