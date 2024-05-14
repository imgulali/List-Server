import { Version } from "../models/VersionModel.js";
import { nodeCache } from "../app.js";
import { sortVersions } from "../utils/VersionUtils.js";

export const fetchLatestVersion = async (req, res, next) => {
  try {
    let versions,
      version = null;

    if (nodeCache.has("versions")) {
      versions = await JSON.parse(nodeCache.get("versions"));
    } else {
      versions = await Version.find().select("-__v");
      nodeCache.set("versions", JSON.stringify(versions));
    }

    if (versions.length > 0) {
      sortVersions(versions);
      version = versions[0];
    }

    res.success("Latest Version Fetched Successfully", {
      version,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllVersions = async (req, res, next) => {
  try {
    let versions;

    if (nodeCache.has("versions")) {
      versions = await JSON.parse(nodeCache.get("versions"));
    } else {
      versions = await Version.find().select("-__v");
      nodeCache.set("versions", JSON.stringify(versions));
    }

    if (versions.length == 0) {
      versions = null;
    }

    sortVersions(versions);

    res.success("All Version Fetched Successfully", {
      versions,
    });
  } catch (error) {
    next(error);
  }
};

export const addVersion = async (req, res, next) => {
  try {
    const { version, appLink } = req.body;

    let addVersion = await Version.findOne({ version });
    if (addVersion) {
      return res.error("Error", "Version Already Exists", 401);
    }
    addVersion = await Version.create({
      version,
      appLink,
    });

    let versions = await Version.find().select("-__v");
    if (versions.length == 0) {
      versions = null;
    }

    sortVersions(versions);

    nodeCache.del("versions");

    res.success("Version Added Successfully", {
      versions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateVersion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { version, appLink } = req.body;
    let updatedVersion = {};

    let DBVersion = await Version.findById(id);
    if (!DBVersion) {
      return res.error("Error", "Version Doesn't Exists", 401);
    }

    if (version) {
      DBVersion = await Version.findOne({ version });
      if (DBVersion) {
        return res.error("Error", "Version Already Exists", 401);
      }

      updatedVersion.version = version;
    }

    if (appLink) updatedVersion.appLink = appLink;

    updatedVersion = await Version.findByIdAndUpdate(
      id,
      { $set: updatedVersion },
      { new: true }
    );

    let versions = await Version.find().select("-__v");
    if (versions.length == 0) {
      versions = null;
    }

    sortVersions(versions);
    nodeCache.del("versions");

    res.success("Version Updated Successfully", {
      versions,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVersion = async (req, res, next) => {
  try {
    const { id } = req.params;
    let version = await Version.findById(id);
    if (!version) {
      return res.error("Error", "Version Doesn't Exists", 401);
    }

    await Version.findByIdAndDelete(id);

    let versions = await Version.find().select("-__v");
    if (versions.length == 0) {
      versions = null;
    }

    sortVersions(versions);
    nodeCache.del("versions");

    res.success("Version Deleted Successfully", {
      versions,
    });
  } catch (error) {
    next(error);
  }
};
