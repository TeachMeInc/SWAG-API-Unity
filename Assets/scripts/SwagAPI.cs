using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using SimpleJSON;

public class SwagAPI : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void SWAG_Init(string gameKey);

    [DllImport("__Internal")]
    private static extern void SWAG_StartSession();

    [DllImport("__Internal")]
    private static extern void SWAG_PostScore(string board, int score);

    [DllImport("__Internal")]
    private static extern void SWAG_PostDailyScore(string date, string level_key, int score);

    [DllImport("__Internal")]
    private static extern void SWAG_ShowDialog(string type, string level_key, string title, string period, string value_formatter);

    [DllImport("__Internal")]
    private static extern void SWAG_GetCurrentEntity();

    [DllImport("__Internal")]
    private static extern void SWAG_GetUserDatastore();

    [DllImport("__Internal")]
    private static extern void SWAG_PostDatastore(string key, string value);

    [DllImport("__Internal")]
    private static extern void SWAG_StartGame();

    [DllImport("__Internal")]
    private static extern void SWAG_EndGame(string options);

    [DllImport("__Internal")]
    private static extern void SWAG_ShowAd();

    [DllImport("__Internal")]
    private static extern void SWAG_GetScoreCategories();

    [DllImport("__Internal")]
    private static extern void SWAG_GetScores(string level_key, string type, string period, int current_user, string target_date, int use_daily, string value_formatter);

    [DllImport("__Internal")]
    private static extern void SWAG_IsSubscriber();

    [DllImport("__Internal")]
    private static extern void SWAG_HasDailyScore();

    [DllImport("__Internal")]
    private static extern void SWAG_GetCurrentDay();

    public GameObject initBtn;
    public GameObject StartSessionBtn;

    bool inited = false;

    // Start is called before the first frame update
    void Start()
    {
        StartSessionBtn.SetActive(false);
    }

    // Update is called once per frame
    public void InitSwag()
    {
        initBtn.SetActive(false);
        SWAG_Init("5c6c3c056917a692f96f9651");
        inited = true;

        StartSessionBtn.SetActive(true);
    }

    public void StartSession()
    {
        if (inited)
            SWAG_StartSession();
    }

    public void StartSessionComplete()
    {
        Debug.Log("complete");
    }

    public void GetCurrentEntity()
    {
        if (inited)
            SWAG_GetCurrentEntity();
    }

    public void GetCurrentEntityComplete(string data)
    {
        Debug.Log("GetCurrentEntityComplete " + data);

        var N = JSON.Parse(data);
    }

    public void PostScore()
    {
        if (inited)
            SWAG_PostScore("level1", 10);
    }

    public void PostDailyScore()
    {
        if (inited)
            SWAG_PostDailyScore("2019-8-1", "level1", 10);
    }

    public void ShowDialog()
    {
        if (inited)
            SWAG_ShowDialog("scores", "level1", "Best ScoreS", "alltime", "");
    }

    public void GetUserDatastore()
    {
        if (inited)
            SWAG_GetUserDatastore();
    }

    public void GetUserDatastoreComplete(string data)
    {
        Debug.Log("GetUserDatastoreComplete " + data);

        var N = JSON.Parse(data);
    }

    public void PostDatastore()
    {
        if (inited)
            SWAG_PostDatastore("test", "hello");
    }

    public void StartGame()
    {
        if (inited)
            SWAG_StartGame();
    }

    public void StartGameComplete()
    {
        Debug.Log("StartGameComplete");
    }

    public void EndGame()
    {
        if (inited)
            SWAG_EndGame("{}");
    }

    public void EndGameComplete()
    {
        Debug.Log("EndGameComplete");
    }

    public void ShowAd()
    {
        if (inited)
            SWAG_ShowAd();
    }

    public void ShowAdComplete()
    {
        Debug.Log("ShowAdComplete");
    }

    public void GetScoreCategories()
    {
        if (inited)
            SWAG_GetScoreCategories();
    }

    public void GetScoreCategoriesCompleted(string data)
    {
        Debug.Log("GetScoreCategoriesCompleted " + data);
    }

    public void GetScores()
    {
        if (inited)
            SWAG_GetScores("level1", "standard", "alltime", 1, "2019-8-1", 0, "default");
    }

    public void GetScoresCompleted(string data)
    {
        Debug.Log("GetScoresCompleted " + data);
    }

    public void IsSubscriber()
    {
        SWAG_IsSubscriber();
    }

    public void IsSubscriberComplete(string data)
    {
        Debug.Log("IsSubscriberComplete " + data);
    }

    public void HasDailyScore()
    {
        SWAG_HasDailyScore();
    }

    public void HasDailyScoreComplete(string data)
    {
        Debug.Log("HasDailyScoreComplete " + data);
    }

    public void GetCurrentDay()
    {
        SWAG_GetCurrentDay();
    }

    public void GetCurrentDayComplete(string data)
    {
        Debug.Log("GetCurrentDayComplete " + data);
    }
}
