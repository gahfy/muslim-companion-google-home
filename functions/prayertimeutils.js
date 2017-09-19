const DateUtils = require('./dateutils');

var School = {
    /** Everything except Hanafi */
    NOT_HANAFI : 0,
    /** Hanafi school */
    HANAFI : 1
}

var HigherLatitudeMode = {
    /** Middle of the night (Fajr and Isha are at the middle of the night) */
    MIDDLE_OF_THE_NIGHT : 0,
    /** One seventh (Isha is at one seventh of the night, Fajr at six seventh of the night) */
    SEVENTH : 1,
    /** Night is divided into (fajrAngle/60) parts and fajr starts at the last period.
    * Similar calculation for Isha
    */
    ANGLE_BASED : 2
};

/**
 * All the possible conventions for prayer time calculation
 */
var Convention = {
    /** Muslim World League */
    MUSLIM_WORLD_LEAGUE : 0,
    /** Islamic Society of North America (ISNA) */
    ISLAMIC_SOCIETY_OF_NORTH_AMERICA : 1,
    /** Egyptian General Authority of Survey */
    EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY : 2,
    /** Umm al-Qura University, Makkah */
    UMM_AL_QURA_UNIVERSITY_MAKKAH : 3,
    /** University of Islamic Sciences, Karachi */
    UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI : 4,
    /** Institute of Geophysics, University of Tehran */
    INSTITUTE_OF_GEOPHYSICS_UNIVERSITY_OF_TEHRAN : 5,
    /** Shia Ithna Ashari, Leva Research Institute, Qum */
    SHIA_ITHNA_ASHARI_LEVA_RESEARCH_INSTITUTE_QUM : 6,
    /** Ministry of religious affairs and Wakfs, Algeria */
    MINISTRY_RELIGIOUS_AFFAIRS_AND_WAKFS_ALGERIA : 7,
    /** Ministry of Habous and Islamic Affairs, Morocco */
    MINISTRY_HABOUS_AND_ISLAMIC_AFFAIRS_MOROCCO : 8,
    /** Ministry of Religious affairs, Tunisia*/
    MINISTRY_RELIGIOUS_AFFAIRS_TUNISIA : 9,
    /** Calculation rules in South East Asia */
    SOUTH_EAST_ASIA : 10,
    /** Union of Islamic Organisations of France */
    UNION_OF_ISLAMIC_ORGANISATIONS_OF_FRANCE : 11,
    /** Grand Mosque of Paris */
    GRAND_MOSQUE_OF_PARIS : 12,
    /** Presidency of Religious Affairs, Turkey */
    PRESIDENCY_OF_RELIGIOUS_AFFAIRS_TURKEY : 13,
    /** Ministry of Endowments and Religious Affairs, Oman */
    MINISTRY_OF_ENDOWMENTS_AND_RELIGIOUS_AFFAIRS_OMAN : 14,
    /** General Authority of Islamic Affairs & Endowments, U.A.E. */
    GENERAL_AUTHORITY_OF_ISLAMIC_AFFAIRS_AND_ENDOWMENTS_UAE : 15,
    /** Department of Islamic Affairs and charitable activities, Dubai */
    DEPARTMENT_OF_ISLAMIC_AFFAIRS_AND_CHARITABLE_ACTIVITIES_DUBAI : 16,
    /** Ministry of Awqaf Islamic Affairs and Holy Places, Jordan */
    MINISTRY_OF_AWQAF_ISLAMIC_AFFAIRS_AND_HOLY_PLACES_JORDAN : 17,
    /** Ministry of Awqaf and Islamic Affairs, Kuwait */
    MINISTRY_OF_AWQAF_AND_ISLAMIC_AFFAIRS_KUWAIT : 18,
    /** Qatar calendar house */
    QATAR_CALENDAR_HOUSE : 19,
    /** Ministry of Endowments and Islamic Affairs, Lybia*/
    MINISTRY_OF_ENDOWMENTS_AND_ISLAMIC_AFFAIRS_LYBIA : 20,
    /** Ministry of Islamic Affairs, Maldives*/
    MINISTRY_OF_ISLAMIC_AFFAIRS_MALDIVES : 21,
    /** Birmingham Central Mosque */
    BIRMINGHAM_CENTRAL_MOSQUE : 22,
    /** London Central Mosque */
    LONDON_CENTRAL_MOSQUE : 23,
    /** Islamic Centre of Quebec */
    ISLAMIC_CENTRE_OF_QUEBEC : 24,
    /** Munich, Germany */
    MUNICH_GERMANY : 25
}

var COUNTRY_DEFAULT_CONVENTION = {
        // Andorra
        "AND" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // United Arab Emirates
        "ARE" : {convention: Convention.GENERAL_AUTHORITY_OF_ISLAMIC_AFFAIRS_AND_ENDOWMENTS_UAE, school : School.NOT_HANAFI},
        // Afghanistan
        "AFG" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Antigua and Barbuda
        "ATG" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Anguilla
        "AIA" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Albania
        "ALB" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Armenia
        "ARM" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Angola
        "AGO" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Antarctica
        "ATA" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Argentine
        "ARG" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // American Samoa
        "ASM" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Austria
        "AUT" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Australia
        "AUS" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Aruba
        "ABW" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Aland Islands
        "ALA" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Azerbaijan
        "AZE" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Bosnia and Herzegovina
        "BIH" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Barbados
        "BRB" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Bangladesh
        "BGD" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Belgium
        "BEL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Burkina Faso
        "BFA" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Bulgaria
        "BGR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Bahrain
        "BHR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Burundi
        "BDI" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Benin
        "BEN" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Saint-Barthelemy
        "BLM" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Bermuda
        "BMU" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Brunei Darussalam
        "BRN" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Bolivia
        "BOL" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Bonaire, Sint Eustatius and Saba
        "BES" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Brazil
        "BRA" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Bahamas
        "BHS" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Bhutan
        "BTN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Bouvet Island
        "BVT" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Botswana
        "BWA" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Belarus
        "BLR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Belize
        "BLZ" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Canada
        "CAN" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Cocos Islands
        "CCK" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Democratic Republic of the Congo
        "COD" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Central African Republic
        "CAF" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Congo
        "COG" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Switzerland
        "CHE" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Cote d'Ivoire
        "CIV" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Cook Islands
        "COK" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Chile
        "CHL" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Cameroon
        "CMR" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // China
        "CHN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Colombia
        "COL" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Costa Rica
        "CRI" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Cuba
        "CUB" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Cabo Verde
        "CPV" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Curacao
        "CUW" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Christmas Islands
        "CXR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Cyprus
        "CYP" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Czech Republic
        "CZE" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Germany
        "DEU" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Djibouti
        "DJI" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Denmark
        "DNK" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Dominica
        "DMA" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Dominican Republic
        "DOM" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Algeria
        "DZA" : {convention: Convention.MINISTRY_RELIGIOUS_AFFAIRS_AND_WAKFS_ALGERIA, school : School.NOT_HANAFI},
        // Ecuador
        "ECU" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Estonia
        "EST" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Egypt
        "EGY" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Western Sahara
        "ESH" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Eritrea
        "ERI" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Spain
        "ESP" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Ethiopia
        "ETH" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Finland
        "FIN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Fiji
        "FJI" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Falkland Islands (Malvinas)
        "FLK" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Micronesia
        "FSM" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Faroe Islands
        "FRO" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // France
        "FRA" : {convention: Convention.UNION_OF_ISLAMIC_ORGANISATIONS_OF_FRANCE, school : School.NOT_HANAFI},
        // Gabon
        "GAB" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // United Kingdom
        "GBR" : {convention: Convention.BIRMINGHAM_CENTRAL_MOSQUE, school : School.HANAFI},
        // Grenada
        "GRD" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Georgia
        "GEO" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // French Guiana
        "GUF" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Guernsey
        "GGY" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Ghana
        "GHA" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Gibraltar
        "GIB" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Greenland
        "GRL" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Gambia
        "GMB" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Guinea
        "GIN" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Guadeloupe
        "GIN" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Equatorial Guinea
        "GNQ" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Greece
        "GRC" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // South Georgia and the South Sandwich Islands
        "SGS" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Guatemala
        "GTM" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Guam
        "GUM" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Guinea-Bissau
        "GNB" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Guyana
        "GUY" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Hong Kong
        "HKG" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Heard and MacDonald Islands
        "HMD" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Honduras
        "HND" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Croatia
        "HRV" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Haiti
        "HTI" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Hungary
        "HUN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Indonesia
        "IDN" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Ireland
        "IRL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Israel
        "ISR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Isle of Man
        "IMN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // India
        "IND" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.NOT_HANAFI},
        // British Indian Ocean Territory
        "IOT" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Iraq
        "IRQ" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Iran
        "IRN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Iceland
        "ISL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Italia
        "ITA" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Jersey
        "JEY" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Jamaica
        "JAM" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Jordan
        "JOR" : {convention: Convention.MINISTRY_OF_AWQAF_ISLAMIC_AFFAIRS_AND_HOLY_PLACES_JORDAN, school : School.NOT_HANAFI},
        // Japan
        "JPN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Kenya
        "KEN" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Kyrgyzstan
        "KGZ" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Cambodia
        "KHM" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Kiribati
        "KIR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Comoros
        "COM" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Saint Kitts and Nevis
        "KNA" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // North Korea
        "PRK" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // South Korea
        "KOR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Kuwait
        "KWT" : {convention: Convention.MINISTRY_OF_AWQAF_AND_ISLAMIC_AFFAIRS_KUWAIT, school : School.NOT_HANAFI},
        // Cayman Islands
        "CYM" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Kazakhstan
        "KAZ" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Laos
        "LAO" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Lebanon
        "LBN" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Saint Lucia
        "LCA" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Liechtenstein
        "LIE" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        "LKA" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Liberia
        "LBR" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Lesotho
        "LSO" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Lithuania
        "LTU" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Luxembourg
        "LUX" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Latvia
        "LVA" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Lybia
        "LBY" : {convention: Convention.MINISTRY_OF_ENDOWMENTS_AND_ISLAMIC_AFFAIRS_LYBIA, school : School.NOT_HANAFI},
        // Morocco
        "MAR" : {convention: Convention.MINISTRY_HABOUS_AND_ISLAMIC_AFFAIRS_MOROCCO, school : School.NOT_HANAFI},
        // Monaco
        "MCO" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Moldova
        "MDA" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Montenegro
        "MNE" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Saint Martin (French part)
        "MAF" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Madagascar
        "MDG" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Marshall Islands
        "MHL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Macedonia
        "MKD" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Mali
        "MLI" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Myanmar
        "MMR" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Mongolia
        "MNG" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Macao
        "MAC" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Northern Mariana Islands
        "MNP" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Martinique
        "MTQ" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Mauritania
        "MRT" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Montserrat
        "MSR" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Malta
        "MLT" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Mauritius
        "MUS" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Maldives
        "MDV" : {convention: Convention.MINISTRY_OF_ISLAMIC_AFFAIRS_MALDIVES, school : School.NOT_HANAFI},
        // Malawi
        "MWI" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Mexico
        "MEX" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Malaysia
        "MYS" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Mozambique
        "MOZ" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Namibia
        "NAM" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // New Caledonia
        "NCL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Niger
        "NER" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Norfolk
        "NFK" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Nigeria
        "NGA" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Nicaragua
        "NIC" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Netherlands
        "NLD" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Norway
        "NOR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Nepal
        "NPL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Nauru
        "NRU" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Niue
        "NIU" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // New Zealand
        "NZL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Oman
        "OMN" : {convention: Convention.MINISTRY_OF_ENDOWMENTS_AND_RELIGIOUS_AFFAIRS_OMAN, school : School.NOT_HANAFI},
        // Panama
        "PAN" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Peru
        "PER" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // French Polynesia
        "PYF" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Papua New Guinea
        "PNG" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Philippines
        "PHL" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Pakistan
        "PAK" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Poland
        "POL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Saint Pierre and Miquelon
        "SPM" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Pitcairn
        "PCN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Puerto Rico
        "PRI" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Palestine
        "PSE" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Portugal
        "PRT" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Palau
        "PLW" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Paraguay
        "PRY" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Qatar
        "QAT" : {convention: Convention.QATAR_CALENDAR_HOUSE, school : School.NOT_HANAFI},
        // Reunion
        "REU" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Romania
        "ROU" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Serbia
        "SRB" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Russia
        "RUS" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Rwanda
        "RWA" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Saudi Arabia
        "SAU" : {convention: Convention.UMM_AL_QURA_UNIVERSITY_MAKKAH, school : School.NOT_HANAFI},
        // Solomon Islands
        "SLB" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Seychelles
        "SYC" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Sudan
        "SDN" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Sweden
        "SWE" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Singapore
        "SGP" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Saint Helena, Ascension and Tristan da Cunha
        "SHN" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Slovenia
        "SVN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Svalbard and Jan Mayen
        "SJM" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Slovakia
        "SVK" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Sierra Leone
        "SLE" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // San Marino
        "SMR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Senegal
        "SEN" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Somalia
        "SOM" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Suriname
        "SUR" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // South Sudan
        "SSD" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Sao Tome and Principe
        "STP" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // El Salvador
        "SLV" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Sint Maarten (Dutch part)
        "SXM" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Syria
        "SYR" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Swaziland
        "SWZ" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Turks and Caicos Islands
        "TCA" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Chad
        "TCD" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // French Southern Territories
        "ATF" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Togo
        "TGO" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Thailand
        "THA" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Tajikistan
        "TJK" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Tokelau
        "TKL" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Timor-Leste
        "TLS" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Turkmenistan
        "TKM" : {convention: Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI, school : School.HANAFI},
        // Tunisia
        "TUN" : {convention: Convention.MINISTRY_RELIGIOUS_AFFAIRS_TUNISIA, school : School.NOT_HANAFI},
        // Tonga
        "TON" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Turkey
        "TUR" : {convention: Convention.PRESIDENCY_OF_RELIGIOUS_AFFAIRS_TURKEY, school : School.NOT_HANAFI},
        // Trinidad and Tobago
        "TTO" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Tuvalu
        "TUV" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Taiwan
        "TWN" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Tanzania
        "TZA" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Ukraine
        "UKR" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Uganda
        "UGA" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // United States Minor Outlying Islands
        "UMI" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // United States
        "USA" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Uruguay
        "URY" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Uzbekistan
        "UZB" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Holy See
        "VAT" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Saint Vincent and the Grenadines
        "VCT" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Venezuela
        "VEN" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Virgin Islands (British)
        "VGB" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Virgin Islands (U.S.)
        "VIR" : {convention: Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA, school : School.NOT_HANAFI},
        // Viet Nam
        "VNM" : {convention: Convention.SOUTH_EAST_ASIA, school : School.NOT_HANAFI},
        // Vanuatu
        "VUT" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Wallis and Futuna
        "WLF" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Samoa
        "WSM" : {convention: Convention.MUSLIM_WORLD_LEAGUE, school : School.NOT_HANAFI},
        // Yemen
        "YEM" : {convention: Convention.UMM_AL_QURA_UNIVERSITY_MAKKAH, school : School.NOT_HANAFI},
        // Mayotte
        "MYT" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // South Africa
        "ZAF" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Zambia
        "ZMB" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
        // Zimbabwe
        "ZWE" : {convention: Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY, school : School.NOT_HANAFI},
    }

class PrayerTimeUtils {
    constructor(year, month, day, latitude, longitude, convention, school){
        /** The year that should be used for the calculation */
        this.year;
        /** The month that should be used for the calculation */
        this.month;
        /** The day that should be used for the calculation */
        this.day;
        /** Time as the centuries ellapsed since January 1, 2000 at 12:00 GMT. */
        this.time;
        /** The latitude for which the prayer times should be calculated */
        this.latitude;
        /** The longitude for which the prayer times should be calculated */
        this.longitude;
        /** The angle for calculation of Fajr */
        this.fajrAngle;
        /** The delay to add for calculation of Fajr */
        this.fajrDelay = 0.0;
        /** The angle for calculation of Isha */
        this.ishaAngle;
        /** The delay to add for calculation of Isha */
        this.ishaDelay = 0.0;
        /** The delay to add to Maghrib */
        this.maghribDelay = 0.0;
        /** The delay to add for calculation of Isha */
        this.ishaDelayNormal = 0.0;
        /** The delay to add for calculation of Isha on Ramadhan */
        this.ishaDelayOnRamadhan = 0.0;
        /** The delay to add for calculation of asr */
        this.asrDelay = 0.0;
        /** The number of times the shadow should be bigger than an object for calculation of Asr */
        this.asrTime = 1.0;
        /** The delay to add for calculation of Sunrise */
        this.sunriseDelay = 0.0;
        /** The angle for calculation of Sunrise */
        this.sunriseAngle = 5.0/6.0;
        /** The angle for calculation of Maghrib */
        this.maghribAngle = 5.0/6.0;
        /** The delay to add for calculation of Dhuhr */
        this.dhuhrDelay = 0.0;
        /** The calculation mode for Fajr and Isha at abnormal periods*/
        this.higherLatitudeMode = HigherLatitudeMode.ANGLE_BASED;




        /** The year that should be used for the calculation */
        this.year = year;
        /** The month that should be used for the calculation */
        this.month = month;
        /** The day that should be used for the calculation */
        this.day = day;
        /** Time as the centuries ellapsed since January 1, 2000 at 12:00 GMT. */
        this.time = (DateUtils.dateToJulian(year, month, day)-2451545)/36525;
        /** The latitude for which the prayer times should be calculated */
        this.latitude = latitude;
        /** The longitude for which the prayer times should be calculated */
        this.longitude = longitude;

        this.changeConvention(convention, school, HigherLatitudeMode.ANGLE_BASED);
    }

    changeCountry(countryIso){
        if(countryIso == null){
            this.changeConvention(Convention.MUSLIM_WORLD_LEAGUE, School.NOT_HANAFI, HigherLatitudeMode.ANGLE_BASED);
        }
        else{
            if(typeof COUNTRY_DEFAULT_CONVENTION[countryIso] !== 'undefined'){
                this.changeConvention(COUNTRY_DEFAULT_CONVENTION[countryIso].convention, COUNTRY_DEFAULT_CONVENTION[countryIso].school, HigherLatitudeMode.ANGLE_BASED);
            }
            else{
                this.changeConvention(Convention.MUSLIM_WORLD_LEAGUE, School.NOT_HANAFI, HigherLatitudeMode.ANGLE_BASED);
            }
        }
    }

    changeConvention(convention, school, mode){
        this.higherLatitudeMode = mode;

        switch (school){
            case School.HANAFI:
                this.asrTime = 2.0;
                break;
            case School.NOT_HANAFI:
                this.asrTime = 1.0;
                break;
        }

        switch(convention){
            case Convention.MUSLIM_WORLD_LEAGUE:
                this.fajrAngle = 18.0;
                this.ishaAngle = 17.0;
                break;
            case Convention.ISLAMIC_SOCIETY_OF_NORTH_AMERICA:
                this.fajrAngle = 15.0;
                this.ishaAngle = 15.0;
                break;
            case Convention.EGYPTIAN_GENERAL_AUTHORITY_OF_SURVEY:
                this.fajrAngle = 19.5;
                this.ishaAngle = 17.5;
                break;
            case Convention.UMM_AL_QURA_UNIVERSITY_MAKKAH:
                this.fajrAngle = 18.5;
                this.ishaAngle = this.maghribAngle;
                this.ishaDelayNormal = 1.5;
                this.ishaDelayOnRamadhan = 2.0;
                break;
            case Convention.UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI:
                this.fajrAngle = 18.0;
                this.ishaAngle = 18.0;
                break;
            case Convention.INSTITUTE_OF_GEOPHYSICS_UNIVERSITY_OF_TEHRAN:
                this.fajrAngle = 17.7;
                this.this.ishaAngle = 14.0;
                break;
            case Convention.SHIA_ITHNA_ASHARI_LEVA_RESEARCH_INSTITUTE_QUM:
                this.fajrAngle = 16.0;
                this.ishaAngle = 14.0;
                this.maghribAngle = 4.0;
                break;
            case Convention.DEPARTMENT_OF_ISLAMIC_AFFAIRS_AND_CHARITABLE_ACTIVITIES_DUBAI:
                this.fajrAngle = 18.5;
                this.ishaAngle = this.maghribAngle;
                this.ishaDelayNormal = 1.5;
                this.ishaDelayOnRamadhan = 2.0;
                this.dhuhrDelay = 4.0/60.0;
                this.asrDelay = 5.0/60.0;
                this.maghribDelay = 2.0/60.0;
                break;
            case Convention.MINISTRY_RELIGIOUS_AFFAIRS_AND_WAKFS_ALGERIA:
                this.fajrAngle = 18.0;
                this.ishaAngle = 17.0;
                this.maghribDelay = 3.0/60.0;
                break;
            case Convention.MINISTRY_HABOUS_AND_ISLAMIC_AFFAIRS_MOROCCO:
                this.fajrAngle = 18.0;
                this.ishaAngle = 17.0;
                this.fajrDelay = -1.0/60.0;
                this.sunriseDelay = -2.0/60.0;
                this.dhuhrDelay = 5.0/60.0;
                this.maghribDelay = 3.0/60.0;
                break;
            case Convention.MINISTRY_RELIGIOUS_AFFAIRS_TUNISIA:
                this.fajrAngle = 18.0;
                this.ishaAngle = 18.0;
                this.fajrDelay = -1.0/60.0;
                this.dhuhrDelay = 7.0/60.0;
                this.maghribDelay = 1.0/60.0;
                this.ishaDelay = 1.0/60.0;
                break;
            case Convention.SOUTH_EAST_ASIA:
                this.fajrAngle = 20.0;
                this.ishaAngle = 18.0;
                this.fajrDelay = 3.0/60.0;
                this.sunriseDelay = 2.0/60.0;
                this.dhuhrDelay = 1.0/60.0;
                this.asrDelay = 2.0/60.0;
                this.maghribDelay = 1.0/60.0;
                this.ishaDelay = -1.0/60.0;
                break;
            case Convention.UNION_OF_ISLAMIC_ORGANISATIONS_OF_FRANCE:
                this.fajrAngle = 12.0;
                this.ishaAngle = 12.0;
                this.fajrDelay = -5.0/60.0;
                this.dhuhrDelay = 5.0/60.0;
                this.maghribDelay = 4.0/60.0;
                this.ishaDelay = 5.0/60.0;
                break;
            case Convention.PRESIDENCY_OF_RELIGIOUS_AFFAIRS_TURKEY:
                this.fajrAngle = 18.0;
                this.ishaAngle = 17.0;
                this.fajrDelay = -2.0/60.0;
                this.sunriseDelay = -7.0/60.0;
                this.dhuhrDelay = 6.0/60.0;
                this.asrDelay = 4.0/60.0;
                this.maghribDelay = 9.0/60.0;
                this.ishaDelay = 2.0/60.0;
                break;
            case Convention.MINISTRY_OF_ENDOWMENTS_AND_RELIGIOUS_AFFAIRS_OMAN:
                this.fajrAngle = 18.0;
                this.ishaAngle = 18.0;
                this.dhuhrDelay = 5.0/60.0;
                this.asrDelay = 5.0/60.0;
                this.maghribDelay = 5.0/60.0;
                this.ishaDelay = 1.0/60.0;
                break;
            case Convention.GENERAL_AUTHORITY_OF_ISLAMIC_AFFAIRS_AND_ENDOWMENTS_UAE:
                this.fajrAngle = 18.5;
                this.ishaAngle = this.maghribAngle;
                this.asrDelay = 4.0/60.0;
                this.maghribDelay = 2.0/60.0;
                this.ishaDelay = 2.0/60.0;
                this.ishaDelayNormal = 1.5;
                this.ishaDelayOnRamadhan = 2.0;
                break;
            case Convention.MINISTRY_OF_AWQAF_ISLAMIC_AFFAIRS_AND_HOLY_PLACES_JORDAN:
                this.fajrAngle = 18.0;
                this.ishaAngle = 18.0;
                break;
            case Convention.MINISTRY_OF_AWQAF_AND_ISLAMIC_AFFAIRS_KUWAIT:
                this.fajrAngle = 18.0;
                this.ishaAngle = 17.5;
                break;
            case Convention.QATAR_CALENDAR_HOUSE:
                this.fajrAngle = 18.0;
                this.ishaAngle = this.maghribAngle;
                this.dhuhrDelay = 4.0/60.0;
                this.maghribDelay = 4.0/60.0;
                this.ishaDelay = 4.0/60.0;
                this.ishaDelayNormal = 1.5;
                this.ishaDelayOnRamadhan = 2.0;
                break;
            case Convention.MINISTRY_OF_ENDOWMENTS_AND_ISLAMIC_AFFAIRS_LYBIA:
                this.fajrAngle = 18.5;
                this.ishaAngle = 18.5;
                this.dhuhrDelay = 4.0/60.0;
                this.maghribDelay = 4.0/60.0;
                break;
            case Convention.MINISTRY_OF_ISLAMIC_AFFAIRS_MALDIVES:
                this.fajrAngle = 19.0;
                this.ishaAngle = 19.0;
                this.sunriseDelay = -1.0/60.0;
                this.dhuhrDelay = 4.0/60.0;
                this.asrDelay = 1.0/60.0;
                this.maghribDelay = 1.0/60.0;
                this.ishaDelay = 1.0/60.0;
                break;
            case Convention.BIRMINGHAM_CENTRAL_MOSQUE:
                this.fajrAngle = 5.0;
                this.ishaAngle = this.maghribAngle;
                this.fajrDelay = -1.0;
                this.ishaDelay = 1.0;
                break;
            case Convention.LONDON_CENTRAL_MOSQUE:
                this.fajrAngle = 5.0;
                this.ishaAngle = this.maghribAngle;
                this.fajrDelay = -1.0;
                this.ishaDelay = 1.0;
                break;
            case Convention.MUNICH_GERMANY:
                this.fajrAngle = 18.0;
                this.ishaAngle = 17.0;
                break;
            case Convention.GRAND_MOSQUE_OF_PARIS:
                this.fajrAngle = 18.0;
                this.ishaAngle = 17.0;
                break;
            case Convention.ISLAMIC_CENTRE_OF_QUEBEC:
                this.fajrAngle = 17.79;
                this.ishaAngle = 17.6;
                this.asrDelay = 5.0/60.0;
                this.maghribDelay = 5.0/60.0;
                break;
        }
    }

    getDhuhr(){
        return 12.0 - (this.longitude/15.0) - (this.equationOfTime(this.time)/60.0);
    }

    getDhuhrOfPreviousDay(){
        return 12.0 - (this.longitude/15.0) - (this.equationOfTime(this.time-(1.0/36525.0))/60.0);
    }

    getDhuhrOfNextDay(){
        return 12.0 - (this.longitude/15.0) - (this.equationOfTime(this.this.time+(1.0/36525.0))/60.0);
    }

    getDhuhrTimestamp(){
        let dhuhr = this.getDhuhr() + this.dhuhrDelay;
        let dhuhrHour = Math.trunc(dhuhr);
        let dhuhrMinutes = Math.trunc(dhuhr*60 - dhuhrHour*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,dhuhrHour,dhuhrMinutes);
        return realTime - (realTime%60000) + 60000;
    }

    getDhuhrOfNextDayTimestamp(){
        let dhuhr = this.getDhuhrOfNextDay() + this.dhuhrDelay;
        let dhuhrHour = Math.trunc(dhuhr);
        let dhuhrMinutes = Math.trunc(dhuhr*60 - dhuhrHour*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,dhuhrHour,dhuhrMinutes) + 24*3600*1000;
        return realTime - (realTime%60000) + 60000;
    }

    getSunriseTimestamp(){
        let hoursInTheDay = this.getDhuhr() - this.getTimeBelowHorizonDifference(this.sunriseAngle) + this.sunriseDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);
        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay);
        return realTime - (realTime%60000) + 60000;
    }

    getSunriseOfNextDayTimestamp(){
        let hoursInTheDay = this.getDhuhrOfNextDay() - this.getTimeBelowHorizonDifference(this.sunriseAngle, this.time + (1.0/36525.0)) + this.sunriseDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay) + 24*3600*1000;
        return realTime - (realTime%60000) + 60000;
    }

    getMaghribTimestamp(){
        let hoursInTheDay = this.getDhuhr() + this.getTimeBelowHorizonDifference(this.maghribAngle) + this.maghribDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay);
        return realTime - (realTime%60000) + 60000;
    }

    getMaghribOfPreviousDayTimestamp(){
        let hoursInTheDay = this.getDhuhrOfPreviousDay() + this.getTimeBelowHorizonDifference(this.maghribAngle, this.time - (1.0/36525.0)) + this.maghribDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay) - 24*3600*1000;
        return realTime - (realTime%60000) + 60000;
    }

    getFajrTimestamp(){
        let timeBelowHorizonDifference = this.getTimeBelowHorizonDifference(this.fajrAngle);
        if(isNaN(timeBelowHorizonDifference)){
            switch (this.higherLatitudeMode){
                case HigherLatitudeMode.MIDDLE_OF_THE_NIGHT:
                    return this.getSunriseTimestamp() - Math.trunc((this.getSunriseTimestamp() - this.getMaghribOfPreviousDayTimestamp())/2.0) + Math.trunc(this.fajrDelay*3600.0*1000.0);
                case HigherLatitudeMode.SEVENTH:
                    return this.getSunriseTimestamp() - Math.trunc((this.getSunriseTimestamp() - this.getMaghribOfPreviousDayTimestamp())/7.0) + Math.trunc(this.fajrDelay*3600.0*1000.0);
                case HigherLatitudeMode.ANGLE_BASED:
                    let t = 60.0/this.fajrAngle;
                    return this.getSunriseTimestamp() - Math.trunc((this.getSunriseTimestamp() - this.getMaghribOfPreviousDayTimestamp())/t) + Math.trunc(this.fajrDelay*3600.0*1000.0);
            }
        }
        let hoursInTheDay = this.getDhuhr() - timeBelowHorizonDifference + this.fajrDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay);
        return realTime - (realTime%60000) + 60000;
    }

    getFajrTimestampOfNextDay(){
        let timeBelowHorizonDifference = this.getTimeBelowHorizonDifference(this.fajrAngle, this.time + (1.0/36525.0));
        if(isNaN(timeBelowHorizonDifference)){
            switch (this.higherLatitudeMode){
                case HigherLatitudeMode.MIDDLE_OF_THE_NIGHT:
                    return this.getSunriseOfNextDayTimestamp() - Math.trunc((this.getSunriseOfNextDayTimestamp() - this.getMaghribTimestamp())/2.0) + Math.trunc(this.fajrDelay*3600.0*1000.0);
                case HigherLatitudeMode.SEVENTH:
                    return this.getSunriseOfNextDayTimestamp() - Math.trunc((this.getSunriseOfNextDayTimestamp() - this.getMaghribTimestamp())/7.0) + Math.trunc(this.fajrDelay*3600.0*1000.0);
                case HigherLatitudeMode.ANGLE_BASED:
                    let t = 60.0/fajrAngle;
                    return this.getSunriseOfNextDayTimestamp() - Math.trunc((this.getSunriseOfNextDayTimestamp() - this.getMaghribTimestamp())/t) + Math.trunc(this.fajrDelay*3600.0*1000.0);
            }
        }
        let hoursInTheDay = this.getDhuhrOfNextDay() - timeBelowHorizonDifference + this.fajrDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay) + 24*3600*1000;
        return realTime - (realTime%60000) + 60000;
    }

    getIshaTimestamp() {
        let timeBelowHorizonDifference = this.getTimeBelowHorizonDifference(this.ishaAngle);

        let hijri = DateUtils.getHijriFromJulianDay(DateUtils.dateToJulian(this.year, this.month, this.day));
        let delayToAdd = hijri[1] == 9 ? this.ishaDelayOnRamadhan : this.ishaDelayNormal;

        if (isNaN(timeBelowHorizonDifference)) {
            switch (this.higherLatitudeMode) {
                case HigherLatitudeMode.MIDDLE_OF_THE_NIGHT:
                    return this.getMaghribTimestamp() + Math.trunc((this.getSunriseOfNextDayTimestamp() - this.getMaghribTimestamp()) / 2.0) + Math.trunc((this.ishaDelay + delayToAdd) * 3600.0 * 1000.0);
                case HigherLatitudeMode.SEVENTH:
                    return this.getMaghribTimestamp() + Math.trunc((this.getSunriseOfNextDayTimestamp() - this.getMaghribTimestamp()) / 7.0) + Math.trunc((this.ishaDelay + delayToAdd) * 3600.0 * 1000.0);
                case HigherLatitudeMode.ANGLE_BASED:
                    let t = 60.0 / ishaAngle;
                    return this.getMaghribTimestamp() + Math.trunc((this.getSunriseOfNextDayTimestamp() - this.getMaghribTimestamp()) / t) + Math.trunc((this.ishaDelay + delayToAdd) * 3600.0 * 1000.0);
            }
        }
        let hoursInTheDay = this.getDhuhr() + timeBelowHorizonDifference + delayToAdd + this.ishaDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay);
        return realTime - (realTime%60000) + 60000;
    }

    getIshaTimestampOfPreviousDay(){
        let timeBelowHorizonDifference = this.getTimeBelowHorizonDifference(this.ishaAngle, this.time - (1.0/36525.0));

        let hijri = DateUtils.getHijriFromJulianDay(DateUtils.dateToJulian(this.year, this.month, this.day));
        let delayToAdd = hijri[1] == 9 ? this.ishaDelayOnRamadhan : this.ishaDelayNormal;

        if(isNaN(timeBelowHorizonDifference)) {
            switch (this.higherLatitudeMode) {
                case HigherLatitudeMode.MIDDLE_OF_THE_NIGHT:
                    return this.getMaghribOfPreviousDayTimestamp() + Math.trunc((this.getSunriseTimestamp() - this.getMaghribOfPreviousDayTimestamp())/2.0) + Math.trunc((this.ishaDelay + delayToAdd)*3600.0*1000.0);
                case HigherLatitudeMode.SEVENTH:
                    return this.getMaghribOfPreviousDayTimestamp() + Math.trunc((this.getSunriseTimestamp() - this.getMaghribOfPreviousDayTimestamp()) / 7.0) + Math.trunc((this.ishaDelay + delayToAdd)*3600.0*1000.0);
                case HigherLatitudeMode.ANGLE_BASED:
                    let t = 60.0/ishaAngle;
                    return this.getMaghribOfPreviousDayTimestamp() + Math.trunc((this.getSunriseTimestamp() - this.getMaghribOfPreviousDayTimestamp()) / t) + Math.trunc((this.ishaDelay + delayToAdd)*3600.0*1000.0);
            }
        }
        let hoursInTheDay = this.getDhuhrOfPreviousDay() + timeBelowHorizonDifference + delayToAdd + this.ishaDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay) - 24*3600*1000;
        return realTime - (realTime%60000) + 60000;
    }

    getAsrTimestamp(){
        let hoursInTheDay = this.getDhuhr() + this.getTimeShadowSizeDifference(this.asrTime) + this.asrDelay;
        let hourInTheDay = Math.trunc(hoursInTheDay);
        let minuteInTheDay = Math.trunc(hoursInTheDay*60 - hourInTheDay*60);

        let realTime = Date.UTC(this.year,this.month-1,this.day,hourInTheDay,minuteInTheDay) - 24*3600*1000;
        return realTime - (realTime%60000) + 60000;
    }

    getTimeShadowSizeDifference(times) {
        let sunAngleForAsr = -1.0 * this.toDegrees(Math.atan(1.0/(times + Math.tan(this.toRadians(Math.abs(this.latitude - this.sunDeclination(this.time)))))));
        return this.getTimeBelowHorizonDifference(sunAngleForAsr);
    }

    getTimeBelowHorizonDifference(angle, time){
        time = (typeof time === 'undefined') ? this.time : time;
        let topOperand = (-Math.sin(this.toRadians(angle)))-Math.sin(this.toRadians(this.latitude))*Math.sin(this.toRadians(this.sunDeclination(time)));
        let bottomOperand = Math.cos(this.toRadians(this.latitude))*Math.cos(this.toRadians(this.sunDeclination(time)));
        let acos = Math.acos(topOperand / bottomOperand);
        if (isNaN(acos))
            return acos;
        return (1.0/15.0)*this.toDegrees(acos);
    }

    sunDeclination(t) {
        let e = this.toRadians(this.obliquityCorrected(t));
        let b = this.toRadians(this.sunApparentLongitude(t));
        let sint = Math.sin(e) * Math.sin(b);
        let theta = Math.asin(sint);
        return this.toDegrees(theta);
    }

    sunEquationOfCenter(t) {
        let m = this.toRadians(this.sunGeometricMeanAnomaly(t));
        return Math.sin(1*m) * (1.914602 - t*(0.004817 + 0.000014*t)) +
                Math.sin(2*m) * (0.019993 - t*(0.000101             )) +
                Math.sin(3*m) * (0.000289);
    }

    sunTrueLongitude(t) {
        return this.sunGeometricMeanLongitude(t) + this.sunEquationOfCenter(t);
    }

    sunApparentLongitude(t) {
        let omega = this.toRadians(125.04 - 1934.136 * t);
        return this.sunTrueLongitude(t) - 0.00569 - 0.00478 * Math.sin(omega);
    }

    equationOfTime(t) {
        let eps = this.toRadians(this.obliquityCorrected(t));
        let l0  = this.toRadians(this.sunGeometricMeanLongitude(t));
        let m   = this.toRadians(this.sunGeometricMeanAnomaly(t));
        let e   = this.eccentricityEarthOrbit(t);
        let y   = Math.tan(eps/2);
        y *= y;

        let sin2l0 = Math.sin(2 * l0);
        let cos2l0 = Math.cos(2 * l0);
        let sin4l0 = Math.sin(4 * l0);
        let sin1m  = Math.sin(m);
        let sin2m  = Math.sin(2 * m);

        let etime = y*sin2l0 - 2*e*sin1m + 4*e*y*sin1m*cos2l0
                - 0.5*y*y*sin4l0 - 1.25*e*e*sin2m;

        return this.toDegrees(etime)*4.0;
    }

    /**
     * Calculate the Geometric Mean Longitude of the Sun.
     * This value is close to 0 degree at the spring equinox,
     * 90 degree at the summer solstice, 180 degree at the automne equinox
     * and 270 degree at the winter solstice.
     *
     * @param  t number of Julian centuries since J2000.
     * @return Geometric Mean Longitude of the Sun in degrees,
     *         in the range 0 degree (inclusive) to 360 degree (exclusive).
     */
    sunGeometricMeanLongitude(t) {
        let L0 = 280.46646 + t*(36000.76983 + 0.0003032*t);
        L0 = L0 - 360*Math.floor(L0/360);
        return L0;
    }

    /**
     * Calculate the mean obliquity of the ecliptic.
     *
     * @param  t number of Julian centuries since J2000.
     * @return Mean obliquity in degrees.
     */
    meanObliquityOfEcliptic(t) {
        let seconds = 21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813)));
        return 23.0 + (26.0 + (seconds/60.0))/60.0;
    }

    /**
     * Calculate the corrected obliquity of the ecliptic.
     *
     * @param  t number of Julian centuries since J2000.
     * @return Corrected obliquity in degrees.
     */
    obliquityCorrected(t) {
        let e0 = this.meanObliquityOfEcliptic(t);
        let omega = this.toRadians(125.04 - 1934.136 * t);
        return e0 + 0.00256 * Math.cos(omega);
    }

    /**
     * Calculate the Geometric Mean Anomaly of the Sun.
     *
     * @param  t number of Julian centuries since J2000.
     * @return Geometric Mean Anomaly of the Sun in degrees.
     */
    sunGeometricMeanAnomaly(t) {
        return 357.52911 + t * (35999.05029 - 0.0001537*t);
    }

    /**
     * Calculate the eccentricity of earth's orbit. This is the ratio
     * {@code (a-b)/a} where <var>a</var> is the semi-major axis
     * length and <var>b</var> is the semi-minor axis length.   Value
     * is 0 for a circular orbit.
     *
     * @param  t number of Julian centuries since J2000.
     * @return The unitless eccentricity.
     */
    eccentricityEarthOrbit(t) {
        return 0.016708634 - t*(0.000042037 + 0.0000001267*t);
    }

    // Converts from degrees to radians.
    toRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    // Converts from radians to degrees.
    toDegrees(radians) {
      return radians * 180 / Math.PI;
  }
}

module.exports = PrayerTimeUtils;
