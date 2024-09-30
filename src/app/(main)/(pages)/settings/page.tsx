
import ProfileForm from '@/components/forms/profile-form'
import { db } from '@/lib/db'
import React from 'react'
import ProfilePicture from './_components/profile-picture'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH_CONFIG } from '@/lib/auth'

type Props = {session: {}}

const Settings = async(props: Props) => {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if( !session) return null

  const user = await db.user.findUnique({
    where:{
      userId: session.user.id
    }
  })


  const uploadProfileImage = async (image: string) => {
    "use server";
    const response = await db.user.update({
      where: {
        userId:  session.user.id,
      },
      data: {
        profileImage: image,
      },
    });
  };

  const removeProfileImage= async () => {
    "use server";
    const response = await db.user.update({
      where: {
        userId:  session.user.id,
      },
      data: {
        profileImage: "",
      },
    });
    return response;
  };

  return (
    <div className="flex flex-col gap-4">
    <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
      <span>Settings</span>
    </h1>
    <div className="flex flex-col gap-10 p-6">
      <div>
        <h2 className="text-2xl font-bold">User Profile</h2>
        <p className="text-base text-white/50">
          Add or update your information
        </p>
      </div>
      <ProfileForm/>
      {/* WIP: Profile , replace uploadcare with a free alternative */}
      <ProfilePicture
        onDelete={removeProfileImage}
        userImage={user?.profileImage || ''}
        onUpload={uploadProfileImage}
      />
      {/* <ProfileForm
        user={user}
        onUpdate={updateUserInfo}
      /> */}
    </div>
  </div>
  )
}

export default Settings
