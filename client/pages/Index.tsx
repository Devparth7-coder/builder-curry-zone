import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import CropCard, { type Crop } from "@/components/ui/crop-card";
import DiseaseCard, { type Disease } from "@/components/ui/disease-card";
import SchemeCard, { type Scheme } from "@/components/ui/scheme-card";

// Brand-appropriate hero imagery
const HERO_BG =
  "https://images.unsplash.com/photo-1549880181-56a44cf4a9a7?q=80&w=2069&auto=format&fit=crop";

// Mock datasets (can be wired to real APIs later)
const mockCrops: Crop[] = [
  {
    id: 1,
    name: "Wheat",
    season: "Rabi",
    yield: "4.5 tons/ha",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rice",
    season: "Kharif",
    yield: "6.2 tons/ha",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Corn",
    season: "Kharif",
    yield: "7.1 tons/ha",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2069&auto=format&fit=crop",
  },
];

const mockDiseases: Disease[] = [
  {
    id: 1,
    name: "Leaf Rust",
    crop: "Wheat",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2070&auto=format&fit=crop",
    severity: "Medium",
  },
  {
    id: 2,
    name: "Blast",
    crop: "Rice",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2069&auto=format&fit=crop",
    severity: "High",
  },
  {
    id: 3,
    name: "Blight",
    crop: "Tomato",
    image:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=2069&auto=format&fit=crop",
    severity: "Low",
  },
];

const mockSchemes: Scheme[] = [
  {
    id: 1,
    name: "PM-KISAN",
    description: "Financial support to farmers",
    eligibility: "All farmer families",
    link: "#",
  },
  {
    id: 2,
    name: "Soil Health Card",
    description: "Improve soil health",
    eligibility: "All farmers",
    link: "#",
  },
  {
    id: 3,
    name: "Crop Insurance",
    description: "Protection against crop loss",
    eligibility: "All farmers",
    link: "#",
  },
];

const availableCrops = [
  "Wheat",
  "Rice",
  "Corn",
  "Soybean",
  "Cotton",
  "Sugarcane",
  "Tomato",
  "Potato",
  "Onion",
  "Pulses",
];

// Simulated services
const ApiService = {
  cropRecommendation: {
    getRecommendations: async (location: string, soil: string) =>
      new Promise<Crop[]>((resolve) =>
        setTimeout(() => resolve(mockCrops), 700),
      ),
  },
  diseaseDetection: {
    detect: async (_image: string) =>
      new Promise<Disease>((resolve) =>
        setTimeout(() => resolve(mockDiseases[0]), 900),
      ),
  },
  expertFinder: {
    findExperts: async () =>
      new Promise<
        {
          id: number;
          name: string;
          specialization: string;
          experience: string;
          contact: string;
        }[]
      >((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: 1,
                name: "Dr. Rajesh Kumar",
                specialization: "Agronomy",
                experience: "15 years",
                contact: "9876543210",
              },
              {
                id: 2,
                name: "Dr. Priya Singh",
                specialization: "Plant Pathology",
                experience: "12 years",
                contact: "9876543211",
              },
              {
                id: 3,
                name: "Dr. Amit Sharma",
                specialization: "Soil Science",
                experience: "18 years",
                contact: "9876543212",
              },
            ]),
          700,
        ),
      ),
  },
  govSchemes: {
    getSchemes: async () =>
      new Promise<Scheme[]>((resolve) =>
        setTimeout(() => resolve(mockSchemes), 600),
      ),
  },
};

export default function Index() {
  // Demo server ping (kept, but hidden)
  const [exampleFromServer, setExampleFromServer] = useState("");
  useEffect(() => {
    fetch("/api/demo")
      .then((r) => r.json())
      .then((d) => setExampleFromServer(String(d?.message ?? "")))
      .catch(() => void 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <CropRecommendation />
      <DiseaseDetection />
      <ExpertFinder />
      <GovSchemes />
      <Profile />
      <p className="sr-only">{exampleFromServer}</p>
    </main>
  );
}

function Hero() {
  return (
    <section id="home" className="relative">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(6,24,6,.55),rgba(6,24,6,.55)), url(${HERO_BG})`,
        }}
      />
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center text-primary-foreground">
        <h1 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          Empowering farmers with technology
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base text-primary-foreground/90 sm:text-lg">
          Expert advice, crop recommendations, disease detection, and scheme
          guidance — all in one place.
        </p>
        <div
          id="get-started"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <a href="#crop-recommendation">Get started</a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#services">Explore services</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = useMemo(
    () => [
      {
        title: "Crop recommendation",
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2c-3 2.5-6 4-10 5 2 7 6 11 10 15 4-4 8-8 10-15-4-1-7-2.5-10-5z" />
          </svg>
        ),
        href: "#crop-recommendation",
        desc: "Personal suggestions based on soil, location and climate.",
      },
      {
        title: "Disease detection",
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-8M4 21v-8m0 0a8 8 0 0116 0M9 9l6 6" />
          </svg>
        ),
        href: "#disease-detection",
        desc: "Upload a photo and get instant triage and treatment tips.",
      },
      {
        title: "Government schemes",
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 10h18M5 6h14M7 2h10M6 14h12v6H6z" />
          </svg>
        ),
        href: "#gov-schemes",
        desc: "Discover and apply for benefits you are eligible for.",
      },
    ],
    [],
  );

  return (
    <section id="services" className="container py-16">
      <h2 className="text-center text-3xl font-bold tracking-tight">
        Our services
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <a
            key={s.title}
            href={s.href}
            className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/15">
                {s.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function CropRecommendation() {
  const [location, setLocation] = useState("");
  const [soil, setSoil] = useState("");
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<Crop[]>([]);

  async function run() {
    setLoading(true);
    try {
      const data = await ApiService.cropRecommendation.getRecommendations(
        location,
        soil,
      );
      setRecs(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="crop-recommendation" className="bg-muted/30 py-16">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Crop recommendation
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Provide your farm details</h3>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Location
                </label>
                <input
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="City, region"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Soil type
                </label>
                <select
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={soil}
                  onChange={(e) => setSoil(e.target.value)}
                >
                  <option value="">Select soil</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="silt">Silt</option>
                </select>
              </div>
              <Button
                className="w-full"
                onClick={run}
                disabled={!location || !soil}
              >
                Get recommendations
              </Button>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Recommended crops</h4>
            {loading ? (
              <Loader />
            ) : recs.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {recs.map((c) => (
                  <CropCard key={c.id} crop={c} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-12 text-center text-muted-foreground">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mb-2"
                >
                  <path d="M12 2c-3 2.5-6 4-10 5 2 7 6 11 10 15 4-4 8-8 10-15-4-1-7-2.5-10-5z" />
                </svg>
                Enter your farm details to get crop recommendations
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(false);

  async function detect() {
    if (!image) return;
    setLoading(true);
    try {
      const d = await ApiService.diseaseDetection.detect(image);
      setResult(d);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="disease-detection" className="py-16">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Disease detection
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Upload crop image</h3>
            <div className="mt-4 grid gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onloadend = () => setImage(String(reader.result));
                  reader.readAsDataURL(f);
                }}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              {image && (
                <img
                  src={image}
                  alt="Uploaded"
                  className="max-h-72 w-full rounded-lg object-contain"
                />
              )}
              <Button className="w-full" onClick={detect} disabled={!image}>
                Detect disease
              </Button>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Detection result</h4>
            {loading ? (
              <Loader />
            ) : result ? (
              <DiseaseCard disease={result} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-12 text-center text-muted-foreground">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mb-2"
                >
                  <path d="M20 21v-8M4 21v-8m0 0a8 8 0 0116 0M9 9l6 6" />
                </svg>
                Upload an image to detect crop diseases
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h4 className="text-center text-2xl font-semibold">
            Common diseases
          </h4>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockDiseases.map((d) => (
              <DiseaseCard key={d.id} disease={d} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertFinder() {
  const [experts, setExperts] = useState<
    {
      id: number;
      name: string;
      specialization: string;
      experience: string;
      contact: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");

  async function find() {
    setLoading(true);
    try {
      const res = await ApiService.expertFinder.findExperts(
        specialization,
        location,
      );
      setExperts(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="expert-finder" className="bg-muted/30 py-16">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Expert finder
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Find an expert</h3>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Specialization
                </label>
                <select
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="">Select specialization</option>
                  <option value="agronomy">Agronomy</option>
                  <option value="pathology">Plant Pathology</option>
                  <option value="soil">Soil Science</option>
                  <option value="horticulture">Horticulture</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Location (optional)
                </label>
                <input
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="City or state"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={find}
                disabled={!specialization}
              >
                Find experts
              </Button>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Available experts</h4>
            {loading ? (
              <Loader />
            ) : experts.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {experts.map((e) => (
                  <div
                    key={e.id}
                    className="rounded-xl border bg-card p-5 shadow-sm"
                  >
                    <h5 className="text-base font-semibold">{e.name}</h5>
                    <p className="text-sm text-muted-foreground">
                      Specialization: {e.specialization}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Experience: {e.experience}
                    </p>
                    <p className="text-sm">
                      Contact: <span className="font-medium">{e.contact}</span>
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Contact expert
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-12 text-center text-muted-foreground">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mb-2"
                >
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z" />
                </svg>
                Use the filters to find agricultural experts
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function GovSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ApiService.govSchemes
      .getSchemes()
      .then((d) => setSchemes(d))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="gov-schemes" className="py-16">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Government schemes
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
          Discover programs that can support your farming activities.
        </p>
        <div className="mt-8">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {schemes.map((s) => (
                <SchemeCard key={s.id} scheme={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Profile() {
  const [user, setUser] = useState({
    name: "Ramesh Kumar",
    email: "ramesh.kumar@example.com",
    phone: "+91 9876543210",
    location: "Punjab, India",
    farmSize: "5 acres",
    soilType: "Loamy",
    mainCrops: ["Wheat", "Rice"] as string[],
    joinDate: "January 2023",
    avatar: "",
    notifications: true,
    smsAlerts: false,
  });
  const [edit, setEdit] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [newCrop, setNewCrop] = useState("");

  function addCrop() {
    if (newCrop && !edit.mainCrops.includes(newCrop)) {
      setEdit((p) => ({ ...p, mainCrops: [...p.mainCrops, newCrop] }));
      setNewCrop("");
    }
  }
  function removeCrop(c: string) {
    setEdit((p) => ({ ...p, mainCrops: p.mainCrops.filter((x) => x !== c) }));
  }
  function save() {
    setTimeout(() => {
      setUser(edit);
      setIsEditing(false);
    }, 500);
  }

  return (
    <section id="profile" className="bg-muted/30 py-16">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Your profile
        </h2>
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="bg-gradient-to-r from-primary to-emerald-500 px-6 py-8 text-primary-foreground">
            <div className="flex flex-col items-center text-center">
              <div className="grid size-28 place-content-center rounded-full border-4 border-white/70 bg-white text-primary">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z" />
                </svg>
              </div>
              <h3 className="mt-3 text-xl font-semibold">{user.name}</h3>
              <p className="opacity-90">Member since {user.joinDate}</p>
              <div className="mt-4 grid grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="font-semibold">{user.mainCrops.length}</div>
                  <div className="opacity-90">Crops</div>
                </div>
                <div>
                  <div className="font-semibold">{user.farmSize}</div>
                  <div className="opacity-90">Farm size</div>
                </div>
                <div>
                  <div className="font-semibold">{user.soilType}</div>
                  <div className="opacity-90">Soil type</div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            {isEditing ? (
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Full name
                    </label>
                    <input
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={edit.name}
                      onChange={(e) =>
                        setEdit({ ...edit, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={edit.email}
                      onChange={(e) =>
                        setEdit({ ...edit, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={edit.phone}
                      onChange={(e) =>
                        setEdit({ ...edit, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Location
                    </label>
                    <input
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={edit.location}
                      onChange={(e) =>
                        setEdit({ ...edit, location: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Farm size
                    </label>
                    <input
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={edit.farmSize}
                      onChange={(e) =>
                        setEdit({ ...edit, farmSize: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Soil type
                    </label>
                    <select
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={edit.soilType}
                      onChange={(e) =>
                        setEdit({ ...edit, soilType: e.target.value })
                      }
                    >
                      <option>Loamy</option>
                      <option>Clay</option>
                      <option>Sandy</option>
                      <option>Silt</option>
                      <option>Peaty</option>
                      <option>Chalky</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Main crops
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={newCrop}
                      onChange={(e) => setNewCrop(e.target.value)}
                    >
                      <option value="">Select a crop</option>
                      {availableCrops.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="outline"
                      onClick={addCrop}
                      disabled={!newCrop}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {edit.mainCrops.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-900"
                      >
                        {c}
                        <button
                          className="opacity-70 hover:opacity-100"
                          onClick={() => removeCrop(c)}
                          aria-label={`remove ${c}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={edit.notifications}
                      onChange={(e) =>
                        setEdit({ ...edit, notifications: e.target.checked })
                      }
                    />
                    Enable notifications
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={edit.smsAlerts}
                      onChange={(e) =>
                        setEdit({ ...edit, smsAlerts: e.target.checked })
                      }
                    />
                    SMS alerts
                  </label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => (setEdit(user), setIsEditing(false))}
                  >
                    Cancel
                  </Button>
                  <Button onClick={save}>Save changes</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" value={user.name} />
                  <Field label="Email" value={user.email} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Phone" value={user.phone} />
                  <Field label="Location" value={user.location} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Farm size" value={user.farmSize} />
                  <Field label="Soil type" value={user.soilType} />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">Main crops</div>
                  <div className="flex flex-wrap gap-2">
                    {user.mainCrops.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-900"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Notifications"
                    value={user.notifications ? "Enabled" : "Disabled"}
                  />
                  <Field
                    label="SMS alerts"
                    value={user.smsAlerts ? "Enabled" : "Disabled"}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsEditing(true)}>
                    Edit profile
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-sm font-medium">{label}</div>
      <div className="rounded-md border bg-background px-3 py-2 text-sm">
        {value}
      </div>
    </div>
  );
}
