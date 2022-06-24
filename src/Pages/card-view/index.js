import React, {lazy, useEffect, useState} from "react";
import "./card-view.css";
import SearchField from "../../components/search-field";

const Card = lazy(() => import("../../components/card"));
const PAGE_LIMIT = 10;

const CardView = () => {
    const [photosList, setPhotosList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [page, setPage] = useState(0);
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        fetchPhotos()
    }, []);

    useEffect(() => {
        if (page) {
            let offset = (page - 1) * PAGE_LIMIT;
            let filterData = photosList.slice(offset, offset + PAGE_LIMIT);
            setFilterList(filterData || [])
        }
    }, [page, photosList])

    const fetchPhotos = () => {
        fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
            .then(r => r.json()).then(response => {
            if (response?.length > 0) {
                setPhotosList(response);
                setPage(1);
            }
        }).catch(error => {
            console.log("error", error);
            setPhotosList([]);
        })
    }

    const getTotalPages = () => {
        return Math.floor((filterSearchList(photosList)?.length) / PAGE_LIMIT) || 1;
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    const handleSearch = (e) => {
        let val = e?.target?.value;
        setSearchValue(val);
        setPage(1);
    }

    // Filter search list
    const filterSearchList = (list = []) => {
        let result = (list || []).filter(item => {
            return item?.title?.toLowerCase().includes(searchValue?.toLowerCase())
        })
        return result || [];
    }

    return (
        <div className={"card-view-container"}>
            <div>
                <SearchField
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                />
            </div>
            <div>
                {(filterSearchList(filterList) || []).map(item => {
                    return (
                        <Card
                            key={item?.id}
                            item={item}
                        />
                    )
                })}
            </div>

            <div className={"pagination-container"}>
                <button
                    className={`${page <= 1 && "disabled-button"}`}
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}>
                    Previous
                </button>
                <div className={"page-title"}>
                    Page {page} of {getTotalPages()}
                </div>
                <button
                    className={`${page >= getTotalPages() && "disabled-button"}`}
                    disabled={page >= getTotalPages()}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default CardView;
