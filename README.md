#include <string>
using namespace std;
unsigned hamming(const std::string &a, const std::string &b)
{
    int count = 0;
    for(int i = 0; i < a.size(); i++){
      count += a[i] != b[i];
    }
    return count;
}
