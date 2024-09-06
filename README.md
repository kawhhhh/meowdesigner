#include <string>
#include <fmt/core.h>
#include <string_view>

std::string restore_brackets(std::string_view s)
{
if (s.front() != '[') return { s.front() };
const auto left = restore_brackets(s.substr(1));
const auto right = restore_brackets(s.substr(1 + left.length() - left.length() / 3));
return fmt::format("[{}{}]", left, right);
}

