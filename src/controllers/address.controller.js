import { Address } from "../db/models/address.model.js";

const registerAddress = async (req, res) => {
  try {
    const {
      add_firstname,
      add_lastname,
      add_phone,
      add_locality,
      add_street,
      add_city,
      add_state,
      add_landmark,
      add_alt_phone,
    } = req.body;

    if (
      !add_firstname &&
      !add_lastname &&
      !add_phone &&
      !add_locality &&
      !add_state &&
      !add_city
    ) {
      return res.send({
        status: 0,
        message: "mandatory address details missing",
      });
    }

    const addressDetails = {
      add_firstname,
      add_lastname,
      add_phone,
      add_locality,
      add_city,
      add_state,
      ...(add_street && { add_street }),
      ...(add_landmark && { add_landmark }),
      ...(add_alt_phone && { add_alt_phone }),
    };

    const createdAddress = await Address.create(addressDetails);

    if (!createdAddress) {
      return res.send({
        status: 0,
        message: "internal error creating Address",
      });
    }

    res.send({
      status: 1,
      message: "address successfully created",
    });
  } catch (error) {
    throw error;
  }
};
const updateAddress = async (req, res) => {
  
};

const getAddress = async (req, res) => {try {
  const { address_id } = req.headers;

  if (!address_id) {
    return res.send({
      status: 0,
      message: "address id required",
    });
  }

  const exist = await Address.findAll({
    attributes: [
      "add_firstname",
      "add_lastname",
      "add_phone",
      "add_locality",
      "add_street",
      "add_city",
      "add_state",
      "add_landmark",
      "add_alt_phone",
    ],
    where: { address_id },
  });

  if (!exist.length) {
    return res.send({
      status: 0,
      message: "no address found",
    });
  }

  console.log("exist....................", exist);

  const addressDetails = {
    ...exist,
  };

  res.send({
    status: 1,
    addressDetails,
    message: "address details found successfully",
  });
} catch (error) {
  throw error;
}};

const deleteAddress = async (req, res) => {
  try {
    const { address_id } = req.body;

    if (!address_id) {
      return res.send({
        status: 0,
        message: "address id required",
      });
    }

    const deletedAddress = await Address.destroy({ where: { address_id } });

    if (!deletedAddress) {
      return res.send({
        status: 0,
        message: "no address found",
      });
    }

    res.send({
      status: 1,
      message: "address details deleted successfully",
    });
  } catch (error) {
    throw error;
  }
};

export { registerAddress, getAddress, updateAddress, deleteAddress };
