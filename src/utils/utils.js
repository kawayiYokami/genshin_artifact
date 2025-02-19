import { secondaryTags } from "@asset/tags";
import { artifactsData } from "@asset/artifacts";

/**
 * attackPercentage, 0.2 => "攻击力+20%"
 * attackStatic, 20 => "攻击力+20"
 */
export function displayedTag(name, value) {
    let tagData = secondaryTags[name];
    if (!tagData) {
        throw "tag name not exist";
    }

    let left = "";
    switch (name) {
        case "attackPercentage":
        case "attackStatic":
            left = "攻击力";
            break;
        case "lifePercentage":
        case "lifeStatic":
            left = "生命值";
            break;
        case "defendPercentage":
        case "defendStatic":
            left = "防御力";
            break;
        default:
            left = tagData.chs;
            break;
    }

    if (tagData.percentage) {
        let s = (value * 100).toFixed(1);
        return left + "+" + s + "%";
    } else {
        return left + "+" + value;
    }
}

/**
 * attackPercentage, 0.1 -> "10"
 * attackStatic, 10 -> "10"
 */
export function convertDisplayTagValue(name, value) {
    let tagData = secondaryTags[name];
    if (!tagData) {
        throw "tag name not exist";
    }

    if (tagData.percentage) {
        return (value * 100).toFixed(1);
    }
    return value;
}

export function getArtifactThumbnailURL(setName) {
    let artData = artifactsData[setName];

    if (artData["flower"]) {
        return artData["flower"].url;
    }

    return artData["head"].url;
}

export function getArtifactRealValue(name, value) {
    let temp = parseFloat(value);
    if (secondaryTags[name].percentage) {
        return temp / 100;
    }
    return temp;
}

export function getDetailName(setName, position) {
    return artifactsData[setName][position].chs;
}

export function getArtifactUpCount(artifact) {
    // historical reasons, star field may not exist, default to 5
    let star = artifact.star ?? 5;
    if (star > 5 || star < 1) {
        return 0;
    }

    let level = 20;
    if (Object.prototype.hasOwnProperty.call(artifact, "level")) {
        level = artifact.level;
    }
    level = Math.min(level, 20);
    level = Math.max(level, 0);

    return star - Math.floor(level / 4);
}

export function positionToLocale(name) {
    switch (name) {
        case "flower":
            return "生之花";
        case "feather":
            return "死之羽";
        case "sand":
            return "时之沙";
        case "cup":
            return "空之杯";
        case "head":
            return "理之冠";
    }
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}