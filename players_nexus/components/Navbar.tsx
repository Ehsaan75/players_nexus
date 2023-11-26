import React, { Fragment, useState } from 'react'
import { HiSearch } from "react-icons/hi";
import Link from 'next/link';

function Navbar() {
    const [toggle, setToggle] = useState(true)
  return (
    <Fragment>
        <nav className={toggle ? '' : 'navBarColor' }>
            <div className = "nav_options">
                <h1 id = {toggle ? "" : 'heading'}>PLAYER'S NEXUS</h1>
                <Link href = "/games"><span id = {toggle ? 'Movies': 'MoviesLight'}>Games</span></Link>
                <Link href = "/news"><span id = {toggle ? 'Movies': 'MoviesLight'}>News</span></Link>
                <Link href = "/friends"><span id = {toggle ? 'Movies': 'MoviesLight'}>Friends</span></Link>
                <Link href = "/profile"><span id = {toggle ? 'Movies': 'MoviesLight'}>Profile</span></Link>
            </div>
            <div className = "input-group">
            <input type = "text" placeholder="Search for the game" />
            <HiSearch fontSize = {21} color="green" id = 'search' />
            <div id = "Color-switcher" onClick={() => setToggle(!toggle)}>
                <div id = {toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
            </div>
            </div>
        </nav>
    </Fragment>
  )
}

export default Navbar