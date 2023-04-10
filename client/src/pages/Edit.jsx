import { NavLink } from "react-router-dom";
import useAxiosPrivate from "../utils/useAxiosPrivate";
import { useEffect, useState } from "react";

const Edit = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosPrivate.get("/user/all");
        console.log(res.data);

        setUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const res = await axiosPrivate.put(`/user/${id}/${role}`);

      setUsers(users.map((user) => (user._id === id ? { ...user, role: role } : user)));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Edit</h1>
      <div className="result">
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Username</td>
              <td>Hashtag</td>
              <td>Role</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.hashtag}</td>
                <td>{user.role}</td>
                <td>
                  <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                    <option value="default">Default</option>
                    <option value="editor">Editor</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <NavLink to="/home">Home Page</NavLink>
      </div>
    </div>
  );
};

export default Edit;
