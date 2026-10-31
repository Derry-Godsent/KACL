/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ServiceItem, RetailOutlet, PublicNotice, CustomerInquiry, BoardMember, ManagementMember, MediaItem } from '../types';

export const KACL_COMPANY_INFO = {
  legalName: 'Kumasi Abattoir Company Limited',
  shortName: 'KACL',
  tagline: 'Home of Quality Meat',
  incorporationYear: '1993',
  commencementDate: '22 September 1994',
  operationsCommenced: 'July 1999',
  statutoryAct: 'Company Code 1963 (Act 179)',
  headquarters: 'Kaase / Ahinsan Industrial Area, Kumasi, Ashanti Region, Ghana',
  ghanaPostAddress: 'AK-373-6444',
  postalAddress: 'P. O. Box AH 9203, Kumasi, Ghana',
  primaryPhone: '0202 015 746',
  salesHotline: '0577 361 460',
  secondaryPhone1: '0577 361 443',
  secondaryPhone2: '0577 361 444',
  allPhones: ['0202 015 746', '0577 361 460', '0577 361 443', '0577 361 444'],
  whatsappNumber: '+233577361460',
  email: 'kumasiabatoir@gmail.com',
  workingHoursText: {
    monFri: 'Mon to Fri: 8am - 5pm',
    sat: 'Sat: 8am - 4pm',
    sun: 'Sun: 8am - 2pm'
  },
  whyChooseKacl: 'We are a world class standard Abattoir where health and safety standards are applied in the slaughtering and dressing of food animals; Cattle, Sheep and Goats and Pigs with the scrutiny and certification of Veterinary Doctors to declare it wholesome for consumption. Any carcass found not to be wholesome by the Veterinary Doctors is condemned, confiscated and disposed off by poisoning and burying same entirely.',
  linesOfBusiness: [
    'To procure livestock from within and outside the country for slaughtering and processing meat.',
    'Production of fresh, wholesome primary cut meat products for public consumption.',
    'Establish market complex to sell meat products in the major cities in Ghana.',
    'To establish livestock or cattle ranch to support the Abattoir’s business'
  ],
  vision: 'To be a modern state of the art Meat Production and Processing Company to meet world class Quality, Safety and Health Standards in Ashanti Region in particular and Ghana as a whole.',
  mission: 'To produce fresh wholesome and hygienic meat, of the highest quality for public consumption as well as excellent customer care service.'
};

export const KACL_CORE_VALUES = [
  { name: 'Safety', description: 'Ensure Safety of all workers and stakeholders within the company premises' },
  { name: 'Quality', description: 'To produce fresh and wholesome meat' },
  { name: 'Excellence', description: 'To aim at nothing but the best' },
  { name: 'Passion', description: 'Committed hardworking and enthusiastic about its business' },
  { name: 'Customer Focus', description: 'To provide excellent customer service' },
  { name: 'Integrity', description: 'To be honest, transparent and accountable' },
  { name: 'Innovation', description: 'Use of ingenuity and state of the art technology in its work' },
  { name: 'Teamwork', description: 'To work with all stakeholders to achieve the common good' }
];

export const KACL_BOARD_MEMBERS: BoardMember[] = [
  { role: 'Chairman', name: 'Mr. Opoku Da-Rocha', portraitUrl: '/images/leadership/board-chairman.jpg' },
  { role: 'Secretary', name: 'Mr. Henry Oracca-Tetteh', portraitUrl: '/images/leadership/henry-orraca-tetteh.jpg' },
  { role: 'Member', name: 'Mr. Abdul Rauf Saeed', portraitUrl: '/images/leadership/abdul-rauf-saeed.jpg' },
  { role: 'Member', name: 'Alhaji Abdulai Tahiru Ansah', portraitUrl: '/images/leadership/abdulai-thahiru.jpg' },
  { role: 'Member', name: 'Rev. Joseph Amo', portraitUrl: '/images/leadership/joseph-amo.jpg' },
  { role: 'Member', name: 'Mr. Zakaria Mohammed', portraitUrl: '/images/leadership/zakaria-mohammed.jpg' },
  { role: 'Member', name: 'Mr. Sampson Sulemana', portraitUrl: '/images/leadership/sulemana-sampson.jpg' },
  { role: 'Member', name: 'Mr. Sumaila Seidu', portraitUrl: '/images/leadership/sumaila-seidu.jpg' }
];

export const KACL_MANAGEMENT: ManagementMember[] = [
  { position: 'Managing Director', name: 'Alhaji Alhassan A. Mahamadu', department: 'Executive Management', portraitUrl: '/images/leadership/alhassan-mahamadu.jpg' },
  { position: 'Admin/HR Manager', name: 'Mrs. Elizabeth Ahlijah Tetteh', department: 'Administration/Human Resources', portraitUrl: '/images/leadership/elizabeth-ahlijah.jpg' },
  { position: 'Production Manager', name: 'Michael Tongban', department: 'Production' },
  { position: 'Finance Head', name: 'Daniel Boateng Siaw', department: 'Finance', portraitUrl: '/images/leadership/daniel-boateng-siaw.jpg' },
  { position: 'Marketing Head', name: 'Samuel Boison', department: 'Marketing/Processing', portraitUrl: '/images/leadership/samuel-boison.jpg' },
  { position: 'Internal Auditor', name: 'Gregory Berchie', department: 'Audit', portraitUrl: '/images/leadership/gregory-berchie.jpg' },
  { position: 'Head, Engineering Unit', name: 'Ebenezer Awuah Kusi', department: 'Engineering Unit', portraitUrl: '/images/leadership/ebenezer-awuah-kusi.jpg' }
];

export const KACL_DEPARTMENTS = [
  'Production',
  'Engineering Unit',
  'General Services Unit',
  'Administration / Human Resources',
  'Security Unit',
  'Finance',
  'Marketing / Processing'
];

export const KACL_ABATTOIR_SERVICES = [
  {
    id: 'srv-flaying',
    name: 'Flaying',
    tagline: 'Professional Hide Removal & Veterinary Certification',
    description: 'The process where our trained and qualified butchers remove the hide or skin from an animal’s carcass and certified by Veterinary Officers for its wholesomeness.'
  },
  {
    id: 'srv-singeing',
    name: 'Singeing',
    tagline: 'Clean LPG-Fired Singeing & Carcass Quartering',
    description: 'This is where our trained, qualified and skilled butchers burn the hair or fur of the carcass, using LPG, dress and cut into four quarters and certified by Veterinary Officers for its wholesomeness.'
  },
  {
    id: 'srv-kraal',
    name: 'Kraal',
    tagline: 'Live Livestock Animal Market Facility',
    description: 'We have a facility (animal market) where life animals, cattle, sheep and goats are sold by individuals who bring their animals for sale to butchers and other individuals to slaughter.'
  },
  {
    id: 'srv-cutting',
    name: 'Cutting',
    tagline: 'Custom Prime Cuts to Exact Table Dimensions',
    description: 'The abattoir renders the service of prime cuts (cutting meat to table size or any specific sizes) at the request of customers.'
  }
];

export const KACL_MARKETING_CHANNELS = [
  {
    id: 'mkt-bulk',
    title: 'Bulk Sales',
    description: 'KACL delivery vans are used to cart meat in bulk quantities from the company premises to hotels, restaurant, and other institutions in the culinary business.',
    iconName: 'truck'
  },
  {
    id: 'mkt-door-to-door',
    title: 'Door to Door Sales',
    description: 'KACL uses its branded cold vans to sell meat to individuals in various institutions like KNUST, KATH and others.',
    iconName: 'home'
  },
  {
    id: 'mkt-retail-outlets',
    title: 'Retail Outlets',
    description: 'KACL has placed deep freezers in shops to sell meat to the Kumasi Metropolis, eg of such shops are Poku Trading.',
    iconName: 'store'
  },
  {
    id: 'mkt-walk-ins',
    title: 'Walk-Ins',
    description: 'Walk-ins are welcomed directly within the company premises at our Kaase butchery center for daily fresh retail purchases.',
    iconName: 'users'
  }
];

// Product images generated strictly with pure meat, no leaves, no herbs, no hands
const IMG_BEEF_PURE = '/src/assets/images/raw_beef_cuts_pure_1793283890125.jpg';
const IMG_TBONE_PURE = '/src/assets/images/raw_tbone_pure_1793283905718.jpg';
const IMG_GOAT_PORK_PURE = '/src/assets/images/raw_goat_pork_pure_1793283919195.jpg';
const IMG_PROCESSED_PURE = '/src/assets/images/processed_sausage_pure_1793283933869.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. BEEF PRODUCTS
  {
    id: 'beef-01',
    name: 'BEEF BONELESS',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-BNL',
    description: 'Fresh lean deboned beef cut, thoroughly trimmed and veterinary inspected.',
    packagingType: 'Food-grade wholesale carton / hygienic wrap',
    storageRequirement: 'Chilled at 0°C to 4°C or frozen at -18°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-02',
    name: 'BEEF FILLET',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-FLT',
    description: 'Tender prime beef tenderloin fillet, ideal for premium steaks and institutional dining.',
    packagingType: 'Vacuum packed / food-grade wrap',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-03',
    name: 'SHREDDED BEEF FILLET',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-SHR',
    description: 'Evenly shredded tender fillet strips prepared for quick cooking and culinary stir-fries.',
    packagingType: 'Hygienic sealed plastic pack',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-04',
    name: 'BEEF BONE-IN',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-BNI',
    description: 'Wholesome bone-in beef portions, suitable for rich traditional Ghanaian soups and stews.',
    packagingType: 'Sanitary wholesale crate / heavy lining',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_TBONE_PURE,
    inStock: true
  },
  {
    id: 'beef-05',
    name: 'SMOKED BEEF BONE-IN',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-SMK',
    description: 'Traditionally cured and cleanly smoked bone-in beef with deep savoury aroma.',
    packagingType: 'Food-grade vacuum pack or lined carton',
    storageRequirement: 'Cool dry chill storage at 2°C to 6°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_TBONE_PURE,
    inStock: true
  },
  {
    id: 'beef-06',
    name: 'BEEF BRISKET',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-BRS',
    description: 'Flavoursome breast cut with natural marbling, ideal for slow roasting and catering braises.',
    packagingType: 'Wholesale wrapped cut block',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-07',
    name: 'BEEF RUMP',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-RMP',
    description: 'Lean hindquarter rump cut offering full beef flavour and tender dining yield.',
    packagingType: 'Vacuum packed block or custom portions',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-08',
    name: 'BEEF SIRLOIN',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-SRL',
    description: 'Prime striploin and sirloin portions cut to customer table-size specifications.',
    packagingType: 'Vacuum packed portion trays',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-09',
    name: 'BEEF OFFALS',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-OFF',
    description: 'Fresh edible organ cuts harvested immediately after humane slaughter and washed thoroughly.',
    packagingType: 'Leak-proof sealed food containers',
    storageRequirement: 'Strict chill at 0°C to 2°C',
    inspectionStatus: 'Post-mortem incision approved by Veterinary Doctors',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-10',
    name: 'BEEF LIVER',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-LIV',
    description: 'Nutrient-rich, disease-screened whole liver lobes certified free of pathology.',
    packagingType: 'Sanitary sealed tubs',
    storageRequirement: 'Strict chill at 0°C to 2°C',
    inspectionStatus: 'Certified by Veterinary Officers',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-11',
    name: 'COW HEAD',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-HED',
    description: 'Cleanly dressed and prepared cow head portion for commercial catering and soup preparation.',
    packagingType: 'Food-grade heavy-duty wrapping',
    storageRequirement: 'Chilled storage',
    inspectionStatus: 'Veterinary stamped for wholesomeness',
    imageUrl: IMG_TBONE_PURE,
    inStock: true
  },
  {
    id: 'beef-12',
    name: 'COW HIDE',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-HID',
    description: 'Properly flayed cow hide prepared for culinary use under sanitary supervision.',
    packagingType: 'Clean wholesale bundle',
    storageRequirement: 'Cool ventilated storage',
    inspectionStatus: 'MoFA Veterinary Checked',
    imageUrl: IMG_TBONE_PURE,
    inStock: true
  },
  {
    id: 'beef-13',
    name: 'COW TONGUE',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-TNG',
    description: 'Fresh clean bovine tongue, trimmed and veterinary certified.',
    packagingType: 'Vacuum pouch',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'MoFA Veterinary Inspected',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-14',
    name: 'OX-TAIL / COW TAIL',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-TAL',
    description: 'Selected meat-rich oxtail portions, skinned, cleaned, and sectioned for gourmet braising.',
    packagingType: 'Food-grade vacuum pack',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_BEEF_PURE,
    inStock: true
  },
  {
    id: 'beef-15',
    name: 'T-BONE STEAK',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-TBN',
    description: 'Classic cut featuring the striploin and tenderloin separated by the characteristic T-bone.',
    packagingType: 'Individual steak wrap / butcher cartons',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'MoFA Veterinary Certified Wholesome',
    imageUrl: IMG_TBONE_PURE,
    inStock: true
  },
  {
    id: 'beef-16',
    name: 'TROTTERS',
    category: 'beef',
    categoryLabel: 'Beef Products',
    code: 'BF-TRT',
    description: 'Cleanly singed and washed bovine feet (trotters), portioned for culinary kitchens.',
    packagingType: 'Sanitary sealed container',
    storageRequirement: 'Chilled at 1°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Checked',
    imageUrl: IMG_TBONE_PURE,
    inStock: true
  },

  // 2. PROCESSED MEAT
  {
    id: 'proc-01',
    name: 'BEEF SAUSAGE',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-BF-SAU',
    description: 'Premium seasoned 100 percent beef sausages made from selected lean trimmings.',
    packagingType: 'Chilled vacuum packs',
    storageRequirement: 'Chilled at 0°C to 4°C or frozen at -18°C',
    inspectionStatus: 'Veterinary inspected source beef',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-02',
    name: 'PEPPERONI SAUSAGE',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-PEP',
    description: 'Spiced and cured sausage links with authentic smoked flavour and firm slice texture.',
    packagingType: 'Vacuum sealed links',
    storageRequirement: 'Chilled at 2°C to 6°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-03',
    name: 'GARLIC SAUSAGE',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-GAR',
    description: 'Savory sausage infused with natural garlic and aromatic spices.',
    packagingType: 'Vacuum sealed pack',
    storageRequirement: 'Chilled at 2°C to 4°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-04',
    name: 'BEEF BURGER',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-BGR',
    description: 'Uniformly portioned seasoned ground beef burger patties for restaurants and hotels.',
    packagingType: 'Wax paper separated burger stack cartons',
    storageRequirement: 'Frozen at -18°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-05',
    name: 'MINCED MEAT (BEEF)',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-MNC',
    description: 'Freshly coarse or fine-ground pure lean beef without fillers.',
    packagingType: 'Oxygen-barrier trays / vacuum packs',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'MoFA Veterinary Inspected Source',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-06',
    name: 'HAM SAUSAGE',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-HAM-S',
    description: 'Finely emulsified and delicately cured ham sausage loaf for deli slicing.',
    packagingType: 'Casing roll',
    storageRequirement: 'Chilled at 1°C to 4°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-07',
    name: 'HAM BURGER',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-HMB',
    description: 'Prepared seasoned patties ready for grilling, dining halls, and fast service.',
    packagingType: 'Layered freezer carton',
    storageRequirement: 'Frozen at -18°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-08',
    name: 'BACON',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-BCN',
    description: 'Cured and hickory smoked bacon rashers with balanced lean and fat strips.',
    packagingType: 'Vacuum sealed slice packs',
    storageRequirement: 'Chilled at 2°C to 4°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-09',
    name: 'COOKED HAM',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-CKH',
    description: 'Steam-cooked, tender cured whole ham ready for cold sandwich slicing or banquet carving.',
    packagingType: 'Hermetic vacuum block',
    storageRequirement: 'Chilled at 1°C to 4°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-10',
    name: 'FRESH PORK SAUSAGE',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-PK-SAU',
    description: 'Traditional fresh pork links prepared in natural casing with classic herbs.',
    packagingType: 'Sanitary sealed pack',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'Veterinary Inspected',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-11',
    name: 'FRANKFURTER',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-FRK',
    description: 'Classic smoked frankfurter wieners, pre-cooked and ready for gentle heating.',
    packagingType: 'Multi-pack vacuum pouch',
    storageRequirement: 'Chilled at 1°C to 4°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-12',
    name: 'WHITE SAUSAGE',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-WHT',
    description: 'Delicate Bavarian-style white sausage flavoured with subtle lemon and parsley notes.',
    packagingType: 'Chilled vacuum pack',
    storageRequirement: 'Chilled at 1°C to 3°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },
  {
    id: 'proc-13',
    name: 'BOEREWORS SAUSAGE',
    category: 'processed',
    categoryLabel: 'Processed Meat',
    code: 'PR-BRW',
    description: 'Coarse spiced beef and pork sausage spiral with toasted coriander and clove notes.',
    packagingType: 'Continuous spiral pack',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'Certified Wholesome',
    imageUrl: IMG_PROCESSED_PURE,
    inStock: true
  },

  // 3. CHEVON / MUTTON PRODUCTS
  {
    id: 'chev-01',
    name: 'DICED GOAT',
    category: 'chevon-mutton',
    categoryLabel: 'Chevon & Mutton Products',
    code: 'CH-DCE',
    description: 'Fresh lean goat meat cleanly diced for traditional soups, light soup, and stews.',
    packagingType: 'Food-grade wholesale carton / pack',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Certified',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },
  {
    id: 'chev-02',
    name: 'GOAT OFFALS',
    category: 'chevon-mutton',
    categoryLabel: 'Chevon & Mutton Products',
    code: 'CH-OFF',
    description: 'Complete set of cleaned and examined edible caprine organ cuts.',
    packagingType: 'Sanitary sealed tub',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'MoFA Veterinary Inspected',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },
  {
    id: 'chev-03',
    name: 'GOAT HEAD',
    category: 'chevon-mutton',
    categoryLabel: 'Chevon & Mutton Products',
    code: 'CH-HED',
    description: 'Cleanly singed and prepared whole goat head.',
    packagingType: 'Sanitary wrap',
    storageRequirement: 'Chilled',
    inspectionStatus: 'Veterinary Certified Wholesome',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },
  {
    id: 'chev-04',
    name: 'LAMB LEG / SHOULDER',
    category: 'chevon-mutton',
    categoryLabel: 'Chevon & Mutton Products',
    code: 'MT-LEG',
    description: 'Whole or halved tender lamb leg and shoulder roasting cuts.',
    packagingType: 'Heavy-duty wrapping',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Inspected',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },
  {
    id: 'chev-05',
    name: 'LAMB CUTLETS',
    category: 'chevon-mutton',
    categoryLabel: 'Chevon & Mutton Products',
    code: 'MT-CUT',
    description: 'Individual lamb rib cutlets trimmed cleanly for pan searing and grilling.',
    packagingType: 'Vacuum packed portion trays',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'MoFA Veterinary Inspected',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },
  {
    id: 'chev-06',
    name: 'MUTTON',
    category: 'chevon-mutton',
    categoryLabel: 'Chevon & Mutton Products',
    code: 'MT-STD',
    description: 'Rich mature sheep meat, portioned or whole quarters for robust culinary cooking.',
    packagingType: 'Wholesale carton / wrapped side',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'MoFA Veterinary Inspected',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },

  // 4. PORK PRODUCTS
  {
    id: 'pork-01',
    name: 'PORK CHOPS',
    category: 'pork',
    categoryLabel: 'Pork Products',
    code: 'PK-CHP',
    description: 'Tender bone-in center cut pork loin chops with clean rind trim.',
    packagingType: 'Sealed portion packs',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'Veterinary Certified Wholesome',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },
  {
    id: 'pork-02',
    name: 'PORK FILLET',
    category: 'pork',
    categoryLabel: 'Pork Products',
    code: 'PK-FLT',
    description: 'Lean tender pork tenderloin fillets for medallions and delicate roasting.',
    packagingType: 'Vacuum packed pouches',
    storageRequirement: 'Chilled at 0°C to 2°C',
    inspectionStatus: 'Veterinary Certified Wholesome',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },
  {
    id: 'pork-03',
    name: 'PORK SPARE RIBS',
    category: 'pork',
    categoryLabel: 'Pork Products',
    code: 'PK-RIB',
    description: 'Full slabs of meaty pork ribs, suitable for barbecue and braising.',
    packagingType: 'Full slab vacuum wrap',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'Veterinary Certified Wholesome',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  },
  {
    id: 'pork-04',
    name: 'PORK LEG',
    category: 'pork',
    categoryLabel: 'Pork Products',
    code: 'PK-LEG',
    description: 'Solid lean hind pork leg roast, whole or boned and rolled to order.',
    packagingType: 'Wholesale butcher netting / wrap',
    storageRequirement: 'Chilled at 0°C to 4°C',
    inspectionStatus: 'Veterinary Certified Wholesome',
    imageUrl: IMG_GOAT_PORK_PURE,
    inStock: true
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-flaying',
    code: 'SRV-FLAY',
    title: 'Flaying Service',
    shortDescription: 'The process where our trained and qualified butchers remove the hide or skin from an animal’s carcass and certified by Veterinary Officers for its wholesomeness.',
    detailedProcess: [
      'Reception of animal on overhead rail after humane slaughter',
      'Specialized dehiding equipment and sterilised flaying knives operated by trained butchers',
      'Complete separation of skin without contamination of meat surfaces',
      'Immediate post-flay inspection and carcass stamping by resident Veterinary Officers'
    ],
    capacityOrSpecs: 'Continuous mechanical dressing line capacity of 200+ heads per shift',
    veterinaryOversight: 'Individual carcass certification by certified Veterinary Officers',
    intendedClients: 'Butchers, wholesalers, livestock dealers, general public'
  },
  {
    id: 'srv-singeing',
    code: 'SRV-SINGE',
    title: 'Singeing Service',
    shortDescription: 'This is where our trained, qualified and skilled butchers burn the hair or fur of the carcass, using LPG, dress and cut into four quarters and certified by Veterinary Officers for its wholesomeness.',
    detailedProcess: [
      'Clean liquefied petroleum gas (LPG) singeing flame eliminating dirty smoke and tire residues',
      'Scraping and washing with high pressure potable water',
      'Dressing and precise mechanical splitting into four quarters',
      'Veterinary inspection and certification on wholesomeness of every dressed quarter'
    ],
    capacityOrSpecs: 'Clean LPG continuous singeing booths',
    veterinaryOversight: 'Certified by Veterinary Officers before cold storage entry',
    intendedClients: 'Butchers, market operators, culinary caterers'
  },
  {
    id: 'srv-kraal',
    code: 'SRV-KRAAL',
    title: 'Kraal (Animal Market)',
    shortDescription: 'We have a facility (animal market) where life animals, cattle, sheep and goats are sold by individuals who bring their animals for sale to butchers and other individuals to slaughter.',
    detailedProcess: [
      'Offloading ramps and resting pens for live cattle, sheep, and goats',
      'Clean watering troughs and shaded holding lairage',
      'Ante-mortem veterinary health observation and screening',
      'Direct transaction marketplace connecting pastoral traders, butchers, and individual buyers'
    ],
    capacityOrSpecs: 'Holding capacity for over 500 cattle and small ruminants daily',
    veterinaryOversight: 'MoFA Veterinary Officers monitor livestock disease status',
    intendedClients: 'Livestock traders, butchers, institutions, individuals'
  },
  {
    id: 'srv-cutting',
    code: 'SRV-CUT',
    title: 'Cutting (Prime Cuts)',
    shortDescription: 'The abattoir renders the service of prime cuts (cutting meat to table size or any specific sizes) at the request of customers.',
    detailedProcess: [
      'Chilled stainless steel butchery processing rooms',
      'Precision electric bone saws and custom deboning tables',
      'Cutting to exact table sizes, stew cubes, or banquet steaks as ordered by clients',
      'Hygienic food-grade packaging and weighing under sanitary supervision'
    ],
    capacityOrSpecs: 'Tailored from individual cuts to multi-tonne contract allocations',
    veterinaryOversight: 'Butchery cutting room operated under cold chain standards (below 12°C)',
    intendedClients: 'Hotels, KNUST, KATH, schools, restaurants, households'
  }
];

export const INITIAL_OUTLETS: RetailOutlet[] = [
  'Kumasi Abattoir Container Meat Shop',
  'Poku Trading, Adum',
  'JP Filling Station-Ahinsan',
  'JP Filling Station-KNUST',
  'KNUST Commercial Center',
].map((name, index) => ({
  id: `outlet-${String(index + 1).padStart(3, '0')}`,
  name,
  locationArea: '', ghanaPostAddress: '', landmark: '', phoneNumber: '',
  operatingHours: '', cutsAvailable: '', deliveryPickupAvailable: false,
}));

export const INITIAL_NOTICES: PublicNotice[] = [
  {
    id: 'not-001',
    title: 'Advisory on Health & Safety Standards and Carcass Condemnation',
    date: '2026-10-15',
    category: 'Veterinary Notice',
    summary: 'Any carcass found not to be wholesome by Veterinary Doctors is condemned, confiscated, and disposed off by poisoning and burying entirely.',
    fullText: 'Kumasi Abattoir Company Limited informs all butchers, dealers, and the public that strict health and safety standards govern the slaughtering and dressing of all cattle, sheep, goats, and pigs. Certification by resident Veterinary Doctors is mandatory to declare meat wholesome for consumption. Carcasses failing inspection are condemned, poisoned, and buried entirely within facility boundary pits under official supervision.',
    isImportant: true
  },
  {
    id: 'not-002',
    title: 'Operating Hours Update for Walk-Ins and Commercial Deliveries',
    date: '2026-10-01',
    category: 'Operational',
    summary: 'Official opening hours: Mon-Fri 8am-5pm, Sat 8am-4pm, Sun 8am-2pm. Slaughter intake operates from early morning.',
    fullText: 'Customers, butchers, and retail buyers are notified of the official sales and dispatch operating schedule: Monday to Friday from 8:00 AM to 5:00 PM; Saturday from 8:00 AM to 4:00 PM; Sunday from 8:00 AM to 2:00 PM. Livestock kraal transactions and early dressing lines commence prior to public desk opening.',
    isImportant: false
  }
];

// No company-authored media has been supplied for publication.
export const INITIAL_MEDIA_ITEMS: MediaItem[] = [];

export const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-101',
    referenceNumber: 'KACL-RFQ-2026-0041',
    createdAt: '2026-10-28T09:15:00Z',
    inquiryType: 'bulk_institutional',
    fullName: 'Kwame Mensah',
    organizationName: 'Golden Stool Grand Hotel & Banqueting',
    email: 'k.mensah@goldenstoolhotel.com',
    phoneNumber: '0244 112 233',
    preferredContact: 'phone',
    deliveryLocation: 'Nhyiaeso, Kumasi',
    requestedProducts: [
      { productId: 'beef-08', productName: 'BEEF SIRLOIN', estimatedKg: 80 },
      { productId: 'proc-05', productName: 'MINCED MEAT (BEEF)', estimatedKg: 50 }
    ],
    notes: 'Require scheduled bi-weekly deliveries on Tuesdays and Fridays before 08:00 GMT in refrigerated van. Please provide quotation per kilogram with cold delivery terms included.',
    status: 'reviewed',
    internalNotes: 'Sales team spoke with Mr. Mensah. Proforma invoice being prepared.',
    assignedStaff: 'Samuel Boison (Marketing Head)'
  }
];
