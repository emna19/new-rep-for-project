import { useEffect, useState } from "react";
import Axios from "axios";
import { parseISO, format, getDay } from "date-fns";
import BarChart from "../charts/BarChart";

export default function AudView(props) {

  const url = "http://localhost:5000/annonces/" + props.infos._id;

  const [clicked, setClicked] = useState(false);

  const [audinAnn, setAudinAnn] = useState([])

  const [verifyClicked, setVerifyClicked] = useState(false);

  const [audience, setAudience] = useState([]);

  const [impression, setImpression] = useState([]);

  const [updatedAt, setUpdatedAt] = useState();

  const [chartAudience, setChartAudience] = useState({});

  const [annonce, setAnnonce] = useState({
    name: "Name",
    startDate: "Start Date",
    endtDate: "End Date",
    sector: "Sector",
    budget: "Budget",
    audience: "Audience",
    clickUrl: "Page url",
    sourceUrl: "Source url",
    type: "Type",
  });

  const styles = {
    card: {
      width: clicked ? "688px" : "603px",
      fontSize: "18px",
      backgroundColor: "transparent",
    },

    cardBody: {
      paddingTop: "5px",
    },
  };
  // console.log(new Date(annonce.startDate).toISOString())

  function handle(e) {
    const newAnnonce = { ...annonce };
    if (e.target.id === "startDate" || e.target.id === "endtDate") {
      newAnnonce[e.target.id] = new Date(e.target.value).toISOString();
    } else {
      newAnnonce[e.target.id] = e.target.value;
    }
    // newAnnonce[e.target.id] = e.target.value
    setAnnonce(newAnnonce);
  }

  function submit(e) {
    e.preventDefault();
    Axios.put(url, annonce).then((response) => {
      return (setUpdatedAt(response.data.updatedAt), setClicked(!clicked))
    });
  }

  useEffect(() => {
    setAnnonce(props.infos);
  }, [props.infos]);

  useEffect(() => {
    fetch("http://localhost:5000/audiences/user/"+props.userID)
      .then((res) => res.json())
      .then((data) => setAudience(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  useEffect(() => {
    if (annonce._id !== undefined) {
      Axios.get(
        "http://localhost:5000/impressions/annonce/" + annonce._id
      ).then((res) => {
        setImpression(res.data);
        console.log(impression);
      });
    }
  }, [annonce]);
  console.log(annonce)

  useEffect(() => {
    let count = {};
    var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";

    for (var i=0; i < weekdays.length; i++) {
      count[weekdays[i]]=0
    }

    impression.forEach(function (x) {
      count[weekdays[getDay( parseISO(x.date), 'yyyy/MM/dd kk:mm:ss')]] = (count[weekdays[getDay( parseISO(x.date), 'yyyy/MM/dd kk:mm:ss')]] || 0) + 1;
    });
    setChartAudience({
      labels: weekdays,
      datasets: [
        {
          label:'Impression Date',
            fill: false,
            backgroundColor: "#114a71",
            borderColor: "#114a71",
            data: Object.values(count)
        },
      ],
    });
  }, [impression]);

  console.log(verifyClicked);

  useEffect(()=>{
    Axios.get('http://localhost:5000/audiences/'+props.audienceID)
      .then(res => setAudinAnn(res.data))
    
  },[])

  return (
    <>
      {verifyClicked && (
        <div>
          <svg
            onClick={() => {
              return setVerifyClicked(!verifyClicked);
            }}
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: "12px 0px 0px 22px" }}
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <div style={{ height: "304px", width: "608px" }}>
            {impression.length !== 0 && (
              <div
                style={{
                  textAlign: "center",
                  margin: "15px",
                  marginTop: 0,
                  position: "absolute",
                  left: "1%",
                  right: "1%",
                }}
              >
                <BarChart chartData={chartAudience} />
              </div>
            )}
          </div>
        </div>
      )}
      {!clicked && !verifyClicked && (
        <div className="card text-center" style={styles.card}>
          <div className=" card-body" style={styles.cardBody}>
            <div className="row mb-3 justify-content-between align-items-center">
              <div
                className="col-auto"
                onClick={() => {
                  setClicked(!clicked);
                }}
              >
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    className="bi bi-pen"
                    viewBox="0 0 16 16"
                  >
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                  </svg>
                </a>
              </div>
              <div className="col-auto" onClick={props.onClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-5 card-title fw-bold">{annonce.name}</h2>

            <div className="row mb-4 px-3">
              <span className="col-3 text-start card-text fw-bold">
                Start date:
              </span>
              <div className="col-9 text-start countries">
                {annonce.startDate !== "Start Date"
                  ? format(parseISO(annonce.startDate), "yyyy/MM/dd")
                  : null}
              </div>
            </div>
            <div className="row mb-4 px-3">
              <span className="col-3 text-start card-text fw-bold">
                End date:
              </span>
              <div className="col-9 text-start countries">
                {annonce.endtDate !== "End Date"
                  ? format(parseISO(annonce.endtDate), "yyyy/MM/dd")
                  : null}
              </div>
            </div>

            <div className="row mb-4 px-3">
              <span className="col-3 text-start card-text fw-bold">
                Audience:
              </span>
              <div className="col-9 text-start countries">
                {audinAnn.name}
              </div>
            </div>

            <div className="row mb-4 px-3">
              <span className="col-3 text-start card-text fw-bold">
                Sector:
              </span>
              <div className="col-9 text-start countries">{annonce.sector}</div>
            </div>
            <div className="row mb-4 px-3">
              <span className="col-3 text-start card-text fw-bold">
                Budget:
              </span>
              <div className="col-9 text-start keywords">{annonce.budget}</div>
            </div>
            <div className="row mb-4 px-3">
              <span className="col-3 text-start card-text fw-bold">
              Click url:
              </span>
              <div className="col-9 text-start movieIds">
                {annonce.clickUrl}
              </div>
            </div>
            <div className="row mb-4 px-3">
              <span className="col-3 text-start card-text fw-bold">
                Source url:
              </span>
              <div className="col-9 text-start movieIds">
                {annonce.sourceUrl}
              </div>
            </div>
            <div className="row mb-4 px-3">
              <span className="col-3 text-start card-text fw-bold">Type:</span>
              <div className="col-9 text-start movieIds">{annonce.type}</div>
            </div>
            <div className="row mb-1 px-3">
              <div className="text-center">
                <button
                  type="button"
                  className="home-container-Add"
                  style={{
                    height: "38px",
                    width: "150px",
                    letterSpacing: "0.1em",
                    fontSize: "17px",
                  }}
                  onClick={() => {
                    return setVerifyClicked(!verifyClicked);
                  }}
                >
                  View statistics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* { audience.length!== 0 && <BarChart chartData={chartAudience}/>} */}

      {clicked && (
        <div className="Annonce edit card text-center" style={styles.card}>
          <div className=" card-body" style={styles.cardBody}>
            <div className="row justify-content-between align-items-center">
              <div className="col-auto"></div>
              <div className="col-auto" onClick={props.onClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>
            <form onSubmit={submit} className="row g-2">
              <div className="col-md-5 mb-5" style={{ margin: "38px auto" }}>
                <input
                  type="text"
                  style={{ fontSize: "25px" }}
                  className="AudView form-control fw-bold text-center"
                  id="name"
                  onChange={handle}
                  value={annonce.name}
                  placeholder="Name"
                />
              </div>

              <div className="row mb-4 px-3 align-items-center">
                <span className="col-3 text-start card-text fw-bold">
                  Start date:
                </span>
                <div className="col-auto card-zone-text">
                  <input
                    type="date"
                    style={{ fontSize: "18px" }}
                    className="AudView form-control"
                    id="startDate"
                    onChange={handle}
                    value={format(
                      parseISO(annonce.startDate),
                      "yyyy-MM-dd"
                    )}
                    placeholder="Start date"
                  />
                </div>

                <span className="col-3 card-text fw-bold">End date:</span>
                <div className="col-auto card-zone-text">
                  <input
                    type="date"
                    style={{ fontSize: "18px" }}
                    className="AudView form-control"
                    id="endtDate"
                    onChange={handle}
                    value={format(
                      parseISO(annonce.endtDate),
                      "yyyy-MM-dd"
                    )}
                    placeholder="End date"
                  />
                </div>
              </div>
              <div className="row mb-4 px-3 align-items-center">
                <span className="col-3 text-start card-text fw-bold">
                  Audience:
                </span>
                <div className="col-4 card-zone-text">
                  <select
                    style={{ fontSize: "18px" }}
                    className="form-select form-control countries-select"
                    onChange={handle}
                    value={annonce.audience}
                    id="audience"
                    aria-label="Default select example"
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    {audience.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="col-3 card-text fw-bold">Sector:</span>
                <div className="col-4 card-zone-text">
                  <select
                    style={{ fontSize: "18px" }}
                    className="form-select form-control countries-select"
                    onChange={handle}
                    value={annonce.sector}
                    id="sector"
                    aria-label="Default select example"
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div className="row mb-4 px-3 align-items-center">
                <span className="col-3 text-start card-text fw-bold">
                  Budget:
                </span>
                <div className="col-4 card-zone-text">
                  <input
                    type="text"
                    style={{ fontSize: "18px" }}
                    className="AudView form-control"
                    id="budget"
                    onChange={handle}
                    value={annonce.budget}
                    placeholder="Budget"
                  />
                </div>
                <span className="col-3 card-text fw-bold">Type:</span>
                <div className="col-4 card-zone-text">
                  <input
                    type="text"
                    style={{ fontSize: "18px" }}
                    className="AudView form-control"
                    id="type"
                    onChange={handle}
                    value={annonce.type}
                    placeholder="Type"
                  />
                </div>
              </div>
              <div className="row mb-4 px-3 align-items-center">
                <span className="col-3 text-start card-text fw-bold">
                  Click url:
                </span>
                <div className="col-8">
                  <input
                    type="text"
                    style={{ fontSize: "18px" }}
                    className="AudView form-control"
                    id="clickUrl"
                    onChange={handle}
                    value={annonce.clickUrl}
                    placeholder="Click url"
                  />
                </div>
              </div>
              <div className="row mb-5 px-3 align-items-center">
                <span className="col-3 text-start card-text fw-bold">
                  Source url:
                </span>
                <div className="col-8">
                  <input
                    type="text"
                    style={{ fontSize: "18px" }}
                    className="AudView form-control"
                    id="sourceUrl"
                    onChange={handle}
                    value={annonce.sourceUrl}
                    placeholder="Source url"
                  />
                </div>
              </div>

              <div
                className="row mb-2 px-3 align-items-center justify-content-end"
                style={{ gap: "12px" }}
              >
                <button
                  type="reset"
                  className="home-container-Delete col-auto"
                  onClick={() => {
                    setClicked(!clicked);
                  }}
                  style={{ height: "35px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="home-container-Add"
                  style={{ height: "35px", fontSize: "17px" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
