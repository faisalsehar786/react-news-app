import React, { useState, useEffect } from "react";
// import CustomPagination from '../CustomPagination'

import REACT_APP_API_URL from "../config";

export const Home = () => {

 

 
  const hostUrl = window.location.origin + "/images/blogthumb.png";

  const [reqData, setreqData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, settotalRecord] = useState(0);
  const [searchTerms, setsearchTerms] = useState("tesla");
  const [source, setsource] = useState("");
  const [cate, setcate] = useState("");
  const [loading, setloading] = useState(false);

  const token = localStorage.getItem("token");

  const getreqData = async (params) => {
    try {
      setloading(true);
      // API Call
      const response = await fetch(
        `${REACT_APP_API_URL}/article/search_article_from_multi_sources?${new URLSearchParams(
          params
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();

      settotalRecord(json?.totalrecords);

      setreqData(json?.articles);
      setloading(false);
    } catch (error) {
      alert("some thing wrongwith backend api");

      setreqData([]);
      setloading(false);
    }
  };

    useEffect(() => {
      const variables = {
          keyword: searchTerms,
          source: source,
          category: cate,
          page: currentPage,
      }

      getreqData(variables)
  }, [])
  
  const serachArticles = () => {
    const variables = {
      keyword: searchTerms,
      source: source,
      category: cate,
      page: currentPage,
    };

    getreqData(variables);
  };
  
  return (
    <React.Fragment>
      <section className="search-sec">
        <div className="container-fluid">
          <form action="#" method="post" noValidate="novalidate">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <input
                      type="text"
                      className="form-control search-slt"
                      placeholder="Search News"
                      value={searchTerms}
                      onChange={(e) => setsearchTerms(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select
                      className="form-control search-slt"
                      id="exampleFormControlSelect1"
                      onChange={(e) => setsource(e.target.value)}
                      value={source}
                    >
                      <option value="">Select Source</option>
                      <option value="open-news">OpenNews</option>
                      <option value="news-cred">NewsCred</option>
                      <option value="the-guardian">The Guardian</option>
                      <option value="new-york-times">New York Times</option>
                      <option value="bbc-news">BBC News</option>
                      <option value="">NewsAPI</option>
                    </select>
                  </div>

                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select
                      className="form-control search-slt"
                      id="exampleFormControlSelect1"
                      onChange={(e) => setcate(e.target.value)}
                      value={cate}
                    >
                      <option>Select Category</option>
                      <option value="">All</option>
                      <option value="business">Business</option>
                      <option value="entertainment">entertainment</option>
                      <option value="general">general</option>
                      <option value="health">health</option>
                      <option value="science">science</option>
                      <option value="sports">sports</option>
                      <option value="technology">technology</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <button
                      type="button"
                      className="btn btn-danger wrn-btn"
                      onClick={serachArticles}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div className="news_content mt-5">
        {!loading ? (
          reqData?.map((news) => {
            return (
              <div className="collumn">
                <div className="head">
                  <span className="headline hl3">{news?.title}</span>
                  <p>
                    <span className="headline hl4">{news?.author}</span>
                  </p>
                  <figure className="figure">
                    <img
                      className="media"
                      src={
                        news?.thumbnail == "blogthumb.png"
                          ? hostUrl
                          : news?.thumbnail
                      }
                      alt=""
                    />
                  </figure>
                  <p>
                    {news?.description
                      ? news?.description
                      : "No details found  read more click blow link"}
                    <br />
                    {news?.content}
                  </p>
                  <a
                    href={news?.weburl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read full news
                  </a>
                </div>
              </div> 
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* <div className='row'>
                  <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
                  <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                    <CustomPagination
                      className='pagination-bar justify-content-md-end'
                      currentPage={currentPage}
                      totalCount={totalRecord ?totalRecord : 0}
                      pageSize={20}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </div> */}
    </React.Fragment>
  );
};
