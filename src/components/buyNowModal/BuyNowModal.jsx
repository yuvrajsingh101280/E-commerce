import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleSubmit = () => {
    // Additional validation can be done here
    if (
      addressInfo.name &&
      addressInfo.address &&
      addressInfo.pincode &&
      addressInfo.mobileNumber
    ) {
      buyNowFunction();
      handleOpen(); // Close modal after order placement
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-xl"
      >
        Buy Now
      </Button>

      <Dialog open={open} handler={handleOpen} className="bg-blue-50 z-50">
        <DialogBody>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={addressInfo.name}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  name: e.target.value,
                })
              }
              placeholder="Enter Your name"
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="address"
              value={addressInfo.address}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  address: e.target.value,
                })
              }
              placeholder="Enter Your Address"
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="pincode"
              value={addressInfo.pincode}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  pincode: e.target.value,
                })
              }
              placeholder="Enter Your Pincode"
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="mobileNumber"
              value={addressInfo.mobileNumber}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  mobileNumber: e.target.value,
                })
              }
              placeholder="Enter your mobile Number"
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-full rounded-md outline-none text-blue-600 placeholder-blue-300"
            />
          </div>

          <div className="">
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-2 py-2 w-full rounded-md outline-none"
            >
              Buy Now
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
