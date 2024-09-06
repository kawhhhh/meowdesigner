#include <string>
#include <string_view>

std::string to_weird_case(std::string_view str) {
  std::string res{str}; int j{};
  for(size_t i{}; i < str.size(); ++i){
    if(str[i] == ' ') j = 0;
    (j % 2) ? res[i] = tolower(res[i]) : res[i] = toupper(res[i]);
    if((static_cast<int>(str[i]) >= 65 && static_cast<int>(str[i]) <= 90) || (static_cast<int>(str[i]) >= 97 && static_cast<int>(str[i]) <= 122)) ++j;
  }
  return res;
}
