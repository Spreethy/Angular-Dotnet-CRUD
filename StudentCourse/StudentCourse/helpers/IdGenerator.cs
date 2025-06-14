public static class IdGenerator
{
    public static string GenerateId(string lastId, string prefix)
    {
        if (string.IsNullOrEmpty(lastId))
            return prefix + "0001";

        int lastNumber = int.Parse(lastId.Substring(prefix.Length));
        return prefix + (lastNumber + 1).ToString("D4");
    }
}
