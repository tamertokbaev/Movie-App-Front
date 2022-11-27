import React, {useState} from "react";
import s from "./Profile.module.scss"
import Layout from "../../components/Layout/Layout";
import {ProfileSideBar} from "./ProfileSideBar";
import ProfilePersonalData from "./ProfilePersonalData";
import ProfileFavoritesData from "./ProfileFavoritesData";

const Profile = () => {
  const [activeSection, setActiveSection] = useState(1)

  const changeActiveSection = (newIndex) => {
    setActiveSection(newIndex)
  }

  return (
    <Layout>
      <div className={s.root}>
        <ProfileSideBar
          activeItemIndex={activeSection}
          changeActiveSection={changeActiveSection}
        />
        {activeSection === 1 && (
          <ProfilePersonalData/>
        )}
        {activeSection === 2 && (
          <ProfileFavoritesData/>
        )}
      </div>
    </Layout>
  )
}

export default Profile
