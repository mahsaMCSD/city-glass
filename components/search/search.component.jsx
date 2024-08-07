import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveCollections, saveSearchFilterQuery,saveMainQuery} from '../../redux/product/product.action';
import { fetchCollections } from '../../services/productService';
import { useState } from 'react';
import { CLEAR_PAGENUMBER } from '../../redux/pagination/pagination.types';
const SearchInput = () => {
    const [inputValue, setInputValue] = useState("");
    let searchFilterQuery = useSelector((state) => state.product.searchFilterQuery);
    const pageNumber = useSelector((state) => state.pagination.pageNumber);
    const dispatch = useDispatch();
    const router = useRouter();
    let esc = encodeURIComponent;
    const handleChange = (event) => {
        setInputValue(event.target.value);
        searchFilterQuery = `search:"${event.target.value}"`;
        dispatch(saveSearchFilterQuery(esc(searchFilterQuery)));
    };
    const handleClick = (event) => {
        event.preventDefault();
        dispatch(saveMainQuery(searchFilterQuery));
        dispatch({type:CLEAR_PAGENUMBER})

        searchFilterQuery
            ? fetchCollections(searchFilterQuery, pageNumber).then((data) => {
                dispatch(saveCollections(data.collections));
                router.push('/products')
                setInputValue("")
            })
            : "";

    }
    return (
        <form className="d-flex">
            <input value={inputValue} className="form-control rounded-0" type="search"
                placeholder="مدل دستگاه یا محافظ صفحه نمایش مد نظرخود را  جست و جو کنید" aria-label="Search" onChange={handleChange} />
            <button onClick={handleClick} className="btn btn-light"><img className="w-50" src="/image/search.svg" alt="" /></button>
        </form>
    )

}
export default SearchInput;