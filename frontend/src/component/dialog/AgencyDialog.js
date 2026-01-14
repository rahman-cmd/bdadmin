import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { createAgency, closeAgencyDialog, updateAgencyName } from "../../store/agencyAdmin/action";
import Male from "../../assets/images/male.png";
import $ from "jquery";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactSelect from "react-select";
import { getCoinSellerUniqueId } from "../../store/coinSeller/action";

export default function AgencyDialog() {
  const dispatch = useDispatch();
  const { dialog: open, dialogData, agencies } = useSelector((state) => state.agencyAdmin);
  const { coinSellerId } = useSelector((state) => state.coinSeller);

  const [data, setData] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const [search, setSearch] = useState("");
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [code, setCode] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [start, setStart] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const scrollPosition = useRef(0);
  const [errors, setError] = useState({
    name: "",
    uniqueId: "",
    mobileNumber: "",
    code: "",
    bankDetails: "",
  });

  useEffect(() => {
    const fetchInitialData = () => {
      setLoading(true);
      setStart(1);
      setData([]);
      dispatch(getCoinSellerUniqueId(1, limit, search));
      setLoading(false);
    };

    fetchInitialData();
  }, [search, limit]);

  useEffect(() => {
    if (coinSellerId?.length) {
      if (start === 1) {
        setData(coinSellerId);
      } else {
        setData((prevData) => {
          if (scrollRef.current) {
            scrollPosition.current = scrollRef.current.scrollTop;
          }
          return [...prevData, ...coinSellerId];
        });
      }
      setHasMore(coinSellerId.length === limit);
    } else {
      setHasMore(false);
    }
    setLoading(false);

    if (start > 1 && scrollRef.current) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollPosition.current;
        }
      });
    }
  }, [coinSellerId, start, limit]);

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      if (scrollRef.current) {
        scrollPosition.current = scrollRef.current.scrollTop;
      }
      setLoading(true);
      const nextPage = start + 1;
      setStart(nextPage);
      dispatch(getCoinSellerUniqueId(nextPage, limit, search));
    }
  };

  useEffect(() => {
    setData(coinSellerId);
  }, [coinSellerId]);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?._id);
      setName(dialogData?.name);
      setUniqueId(dialogData?.uniqueId);
      setMobileNumber(dialogData?.mobile);
      setCode(dialogData?.agencyCode);
      setBankDetails(dialogData?.bankDetails);
    }
  }, [dialogData]);

  $(document).ready(function () {
    $("img").bind("error", function () {
      $(this).attr("src", Male);
    });
  });

  useEffect(
    () => () => {
      setError({
        name: "",
        mobileNumber: "",
        code: "",
        uniqueId: "",
        bankDetails: "",
      });
      setMongoId("");
      setName("");
      setUniqueId("");
      setCode("");
      setMobileNumber("");
      setBankDetails("");
    },
    [open]
  );

  const createCode = () => {
    const randomChars = "0123456789";
    let code_ = "";
    for (let i = 0; i < 5; i++) {
      code_ += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    setCode(code_);
    if (!code_) {
      return setError({
        ...errors,
        code: "Code can't be a blank!",
      });
    } else {
      return setError({
        ...errors,
        code: "",
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (mongoId) {
      // Edit mode - only validate name
      if (!name) {
        return setError({ ...errors, name: "Name can't be a blank!" });
      }
      dispatch(updateAgencyName(mongoId, name));
      closePopup();
      return;
    }

    // Create mode - validate all fields
    if (!name || !code || !mobileNumber || !uniqueId || !bankDetails) {
      const errors = {};
      if (!name) {
        errors.name = "Name can't be a blank!";
      }
      if (!uniqueId) errors.uniqueId = "UniqueId Is Required !";
      if (!mobileNumber) errors.mobileNumber = "MobileNumber is Required !";
      if (!code) {
        errors.code = "Code can't be a blank!";
      }
      if (!bankDetails) errors.bankDetails = "Bank Details can't be a blank!";

      return setError({ ...errors });
    }
    if (code?.length > 10) {
      return setError({
        ...errors,
        code: "Maximum 6 Digits are Allowed!",
      });
    }

    if (code?.length < 5) {
      return setError({
        ...errors,
        code: "Minimum 5 Digits are Allowed!",
      });
    }

    // Check if code already exists
    if (!mongoId) {
      const index = agencies?.findIndex(
        (agency) => agency?.agencyCode?.toString() === code
      );
      if (index > -1) {
        return setError({ ...errors, code: "Code already exist." });
      }
    } else {
      const index = agencies?.find((agency) => agency?.agencyCode?.toString() === code);
      if (index !== undefined) {
        if (index?._id === mongoId) {
        } else {
          return setError({ ...errors, code: "Code already exist." });
        }
      }
    }

    const formData = {
      name,
      uniqueId,
      agencyCode: code,
      mobile: mobileNumber,
      bankDetails,
    };

    dispatch(createAgency(formData));
    closePopup();
  };

  const closePopup = () => {
    dispatch(closeAgencyDialog());
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
        sx={{ 
          maxWidth: { xs: "95%", sm: "500px", md: "600px" }, 
          margin: "0 auto",
          "& .MuiDialog-paper": {
            margin: { xs: "16px", sm: "32px" },
            width: "100%",
          }
        }}
      >
        <DialogTitle 
          id="responsive-dialog-title"
          sx={{ position: "relative", paddingRight: "48px" }}
        >
          <span className="text-danger font-bold text-xl"> Agency </span>
          <IconButton
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              padding: "4px",
            }}
          >
            <Tooltip title="Close">
              <Cancel className="text-danger cursor-pointer" onClick={closePopup} />
            </Tooltip>
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-4 md:p-6">
          <div className="pt-1 px-1 pb-3">
            <div className="flex flex-col">
              <form className="w-full">
                <div className="w-full">
                  <div className="w-full">
                    <div className="mb-4">
                      {errors.bd && (
                        <div className="ml-2 mt-1">
                          {errors.bd && (
                            <div className="pl-1 text-left">
                              <span className="text-red">{errors.bd}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {!dialogData && (
                    <div className="w-full mt-3">
                      <div className="mb-4">
                        <label className="mb-2 block text-text">
                          Unique Id of User
                        </label>

                        <ReactSelect
                          value={data.find(
                            (option) => option.uniqueId === uniqueId
                          )}
                          options={data}
                          getOptionLabel={(option) => option.uniqueId}
                          formatOptionLabel={(option) => (
                            <div className="flex items-center">
                              <img
                                src={option.image || Male}
                                alt="country"
                                className="h-[30px] w-[30px] rounded-full"
                              />
                              <span className="ml-3">{option.uniqueId}</span>
                            </div>
                          )}
                          onChange={(selectedOption) => {
                            setUniqueId(selectedOption.uniqueId);
                            setError({ ...errors, uniqueId: "" });
                          }}
                          onInputChange={(inputValue) => setSearch(inputValue)}
                          styles={{
                            menu: (provided) => ({
                              ...provided,
                              maxHeight: "250px",
                              overflowY: "auto",
                            }),
                          }}
                          components={{
                            MenuList: (props) => (
                              <div
                                id="scrollable-container"
                                ref={scrollRef}
                                className="max-h-[250px] overflow-y-auto scroll-smooth"
                              >
                                <InfiniteScroll
                                  dataLength={data.length || 0}
                                  next={fetchMoreData}
                                  hasMore={hasMore}
                                  loader={<p className="text-center py-2">Loading more data...</p>}
                                  scrollableTarget="scrollable-container"
                                  scrollThreshold={0.9}
                                  style={{ overflow: "hidden" }}
                                  endMessage={
                                    !loading &&
                                    data.length > 0 && (
                                      <p className="text-center py-2">
                                        No more data to load.
                                      </p>
                                    )
                                  }
                                >
                                  {props.children}
                                </InfiniteScroll>
                              </div>
                            ),
                          }}
                        />
                        {errors.uniqueId && (
                          <div className="ml-2 mt-1">
                            {errors.uniqueId && (
                              <div className="pl-1 text-left">
                                <span className="text-red">
                                  {errors.uniqueId}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="w-full mt-3 mb-4">
                    <label className="mb-2 block text-text">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 rounded-custom border border-dark-border bg-dark-card text-white text-sm focus:outline-none focus:ring-0"
                      placeholder="Enter Name"
                      required
                      value={name}
                      onKeyPress={handleKeyPress}
                      onChange={(e) => {
                        setName(e.target.value.trim());

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            name: "Name can't be a blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            name: "",
                          });
                        }
                      }}
                    />
                    {errors.name && (
                      <div className="ml-2 mt-1">
                        {errors.name && (
                          <div className="pl-1 text-left">
                            <span className="text-red">{errors.name}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`${mongoId ? "w-full" : "w-full"}`}>
                  <div className="mt-2 mb-4">
                    <label className="mb-2 block text-text">Mobile Number</label>
                    <input
                      type="number"
                      className="w-full px-3 py-3 rounded-custom border border-dark-border bg-dark-card text-white text-sm focus:outline-none focus:ring-0"
                      placeholder="Enter Mobile Number"
                      required
                      value={mobileNumber}
                      onKeyPress={handleKeyPress}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            mobileNumber: "mobileNumber can't be a blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            mobileNumber: "",
                          });
                        }
                      }}
                    />
                    {errors.mobileNumber && (
                      <div className="ml-2 mt-1">
                        {errors.mobileNumber && (
                          <div className="pl-1 text-left">
                            <span className="text-red">
                              {errors.mobileNumber}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full mt-2">
                  <div className="mb-4">
                    <label className="mb-2 block text-text">Bank Details</label>
                    <textarea
                      className="w-full px-3 py-3 rounded-custom border border-dark-border bg-dark-card text-white text-sm focus:outline-none focus:ring-0 resize-y"
                      placeholder="Enter Bank Details"
                      required
                      rows={4}
                      value={bankDetails}
                      onKeyPress={handleKeyPress}
                      onChange={(e) => {
                        setBankDetails(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            bankDetails: "bankDetails can't be a blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            bankDetails: "",
                          });
                        }
                      }}
                    />
                    {errors.bankDetails && (
                      <div className="ml-2 mt-1">
                        {errors.bankDetails && (
                          <div className="pl-1 text-left">
                            <span className="text-red">
                              {errors.bankDetails}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row mt-3 gap-3">
                  <div className={`${mongoId ? "w-full" : "w-full md:w-9/12"}`}>
                    <div className="mb-4">
                      <label className="mb-2 block text-text text-sm md:text-base">Agency Code</label>
                      <input
                        readOnly
                        type="number"
                        className="w-full px-3 py-2 md:py-3 rounded-custom border border-dark-border bg-dark-card text-white text-xs md:text-sm focus:outline-none focus:ring-0"
                        placeholder="Enter Code"
                        required
                        value={code}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setCode(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              code: "Code can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              code: "",
                            });
                          }
                        }}
                      />
                      {errors.code && (
                        <div className="ml-2 mt-1">
                          {errors.code && (
                            <div className="pl-1 text-left">
                              <span className="text-red">{errors.code}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {!mongoId && (
                    <div className="w-full md:w-3/12 pl-0 flex justify-start md:justify-end items-end md:items-center mt-0 md:mt-[22.01px]">
                      <button
                        type="button"
                        className="bg-info hover:bg-info/90 text-white text-xs md:text-sm py-2 px-3 md:px-4 rounded transition-colors w-full md:w-auto"
                        onClick={createCode}
                      >
                        Auto Generate
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex flex-col-reverse md:flex-row gap-2 md:gap-0 justify-end">
                  <button
                    type="button"
                    className="bg-transparent border border-info text-info hover:bg-info/10 px-4 md:px-6 py-2 md:py-3 rounded transition-colors text-sm md:text-base w-full md:w-auto"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="bg-danger hover:bg-danger/90 text-white px-4 md:px-6 py-2 md:py-3 rounded transition-colors text-sm md:text-base w-full md:w-auto md:ml-2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
