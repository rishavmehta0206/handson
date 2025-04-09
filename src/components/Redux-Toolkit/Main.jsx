import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts, getAllPosts } from './feature/postsSlice'
import { fetchAllUsers, getAllUsers } from './feature/usersSlice';

const Main = () => {
    const posts = useSelector(getAllPosts);
    const users = useSelector(getAllUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers())
            .then(() => dispatch(fetchAllPosts()))
    }, [dispatch])



    return (
        <div>
        </div>
    )
}

export default Main