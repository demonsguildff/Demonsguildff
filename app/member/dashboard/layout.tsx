<div className="container flex h-16 items-center justify-between">
  <div className="flex items-center gap-4">
    <Image
      src="https://i.postimg.cc/Hkd3GctP/DEMONS-NEW-LOGO.jpg"
      alt="DEMONS GUILD FF Logo"
      width={40}
      height={40}
      className="rounded-full"
    />
    <h1 className="text-2xl font-bold">Dashboard</h1>
  </div>
  <Button 
    variant="ghost" 
    onClick={logout}
    className="gap-2"
  >
    <LogOut className="h-4 w-4" />
    Logout
  </Button>
</div>

