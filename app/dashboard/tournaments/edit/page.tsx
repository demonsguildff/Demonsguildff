// In the CardContent section, update the participants display:
<div className="flex items-center gap-2">
  <Users className="h-4 w-4 text-muted-foreground" />
  <span className="text-sm">
    {`${tournament.participants.current}/${tournament.participants.max} Teams`}
  </span>
</div>

