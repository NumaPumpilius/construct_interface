import React from 'react'
import Header from './Header'
import Navbar from './Navbar'

const style = {
    wrapper: /*tw*/ "bg-black w-screen h-screen fixed text-white",
    appWrapper: /*tw*/  "w-5/6 flex flex-col h-full fixed right-0 top-32 ml-60",
    mainWrapper: /*tw*/ "w-full h-full flex justify-center right-0",
}

const Layout = ({ children }) => {
    return (
        <div className={style.wrapper}>
            <Navbar />
            <Header />
            <div className={style.appWrapper}>
                <main className={style.mainWrapper}>{children}</main>
            </div>
        </div>
    )
}

export default Layout;