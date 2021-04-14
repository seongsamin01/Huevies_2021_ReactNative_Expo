import React, { useState, useEffect } from "react";
import { movieApi } from "../../api";
import FavsPresenter from "./FavsPresenter";

export default () => {
    const [movies, setMovies] = useState({
        results: [],
        error: null
    });
    const getData = async () => {
        const [results, error] = await movieApi.discover();
        setMovies({
            results,
            error
        });
    };
    useEffect(() => {
        getData();
    }, []);
    return <FavsPresenter {...movies} />;
};